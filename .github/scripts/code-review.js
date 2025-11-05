import { GoogleGenAI } from '@google/genai';
import { execSync } from 'child_process';
import { Octokit } from '@octokit/rest';

(async () => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const repoRef = process.env.GITHUB_REPOSITORY;
    const ref = process.env.GITHUB_REF;

    if (!GEMINI_API_KEY || !GITHUB_TOKEN || !repoRef || !ref) {
      throw new Error('Missing environment variables: GEMINI_API_KEY, GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_REF');
    }

    const [owner, repo] = repoRef.split('/');
    const prMatch = ref.match(/(\d+)$/);
    if (!prMatch) throw new Error('Could not extract PR number from ref');
    const prNumber = parseInt(prMatch[1], 10);

    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    console.log('📦 Fetching diff...');
    let diff;
    try {
      diff = execSync('git diff origin/main...HEAD', { encoding: 'utf8' });
    } catch (error) {
      console.warn('⚠️  Could not fetch diff, attempting alternative branch...');
      diff = execSync('git diff HEAD~1...HEAD', { encoding: 'utf8' });
    }

    if (!diff || diff.trim().length === 0) {
      console.log('⚠️  No changes detected in diff');
      return;
    }

    const prompt = `You are a senior software engineer with expertise in code quality, security, and performance.
Your task is to perform a thorough code review on this GitHub pull request diff.

## Review Focus Areas (in order of priority):

1. **Security Issues** 🔒
   - SQL injection, XSS, authentication flaws, sensitive data exposure
   - Unsafe dependencies or outdated versions
   - Unvalidated user inputs

2. **Critical Bugs** 🐛
   - Logic errors that could cause runtime failures
   - Race conditions, memory leaks, infinite loops
   - Incorrect null/undefined handling

3. **Performance Issues** ⚡
   - Unnecessary loops or nested iterations
   - N+1 query problems (especially in APIs/databases)
   - Missing caching or optimization opportunities
   - Inefficient algorithms

4. **Code Quality & Maintainability** 📝
   - Unclear variable/function names
   - Missing error handling
   - Code duplication or violations of DRY principle
   - Insufficient logging or debugging capabilities

5. **Best Practices & Standards** 📋
   - Design patterns and architectural issues
   - Testing gaps (no unit tests for critical logic)
   - Documentation and comments missing
   - API design inconsistencies

## Response Format:

**Summary:** [1-2 sentences overview of the PR changes]

**Severity Breakdown:**
- 🔴 Critical: [count] - Security/data loss risks
- 🟡 Major: [count] - Bugs or significant quality issues
- 🟢 Minor: [count] - Code quality improvements

**Detailed Findings:**

[For each issue found]
**[Issue Type]** - [filename]:[line_number]
- Problem: [Clear explanation of the issue]
- Risk: [Why this matters]
- Fix: [Specific, actionable recommendation]

---

**Overall Assessment:** [Is this PR ready to merge? Any blockers?]

---

## Instructions:
- Be specific and actionable - developers should know exactly what to fix
- Only flag genuine issues, not minor style preferences
- If the code is solid, acknowledge what's done well
- Prioritize critical issues over style concerns
- Be professional and constructive in tone

Git Diff:
\`\`\`
${diff}
\`\`\``;

    console.log('🧠 Sending diff to Gemini 2.0 Flash...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });

    const reviewText = response.text;

    if (!reviewText || reviewText.trim().length === 0) {
      throw new Error('Empty response from Gemini model');
    }

    console.log('💬 Posting review comment to PR #' + prNumber + '...');
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: `## 🤖 Automated Code Review\n\n${reviewText}`,
    });

    console.log('✅ Review posted successfully!');
  } catch (err) {
    console.error('❌ Error during review:', err.message);
    process.exit(1);
  }
})();