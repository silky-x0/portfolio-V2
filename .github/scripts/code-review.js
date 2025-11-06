import { GoogleGenAI } from '@google/genai';
import { execSync } from 'child_process';
import { Octokit } from '@octokit/rest';

(async () => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const repoRef = process.env.GITHUB_REPOSITORY;
    const prNumber = parseInt(process.env.PR_NUMBER, 10);

    if (!GEMINI_API_KEY || !GITHUB_TOKEN || !repoRef || !prNumber) {
      throw new Error('Missing environment variables: GEMINI_API_KEY, GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER');
    }

    if (isNaN(prNumber)) {
      throw new Error('Invalid PR_NUMBER: must be a number');
    }

    const [owner, repo] = repoRef.split('/');

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

    const prompt = `You are a senior code reviewer. Review this PR diff and respond with CLEAN, SCANNABLE formatting.

## IMPORTANT FORMATTING RULES:
- Use SHORT sentences, not paragraphs
- Add blank lines between sections
- Use code blocks only for examples
- Be concise - reviewers should scan in 10 seconds
- Emojis: 🔒 Security | 🐛 Bug | ⚡ Performance | 📝 Quality | 📋 Best Practice

## Review Focus (Priority Order):
1. Security vulnerabilities, data exposure, unsafe inputs
2. Logic bugs, null handling, race conditions
3. Performance (loops, queries, caching)
4. Code quality (naming, duplication, error handling)
5. Best practices (testing, documentation, design)

## RESPONSE FORMAT (STRICT):

**📊 Summary**
[1 sentence: what changed]

**🎯 Issues Found: [X]**

**🔴 Critical: [X] | 🟡 Major: [X] | 🟢 Minor: [X]**

---

**Issues:**

**[Type]** - file.tsx:123
- Issue: [1 sentence problem]
- Why: [1 sentence impact]
- Fix: [1-2 sentences solution]

*Keep this format for each issue - use blank lines between*

---

**✅ Assessment**
[1-2 sentences: ready to merge? any blockers?]

---

## Rules:
- Only list REAL issues
- Be specific with line numbers
- Make fixes actionable, not vague
- If code is good, say it
- No walls of text

Git Diff:
\`\`\`
${diff}
\`\`\``;

    console.log('🧠 Sending diff to Gemini 2.0 Flash...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
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