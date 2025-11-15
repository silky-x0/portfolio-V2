import { GoogleGenAI } from '@google/genai';
import { execSync } from 'child_process';
import { Octokit } from '@octokit/rest';
import { createHash } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

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

    // Detect project context from package.json
    const detectProjectContext = () => {
      try {
        const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        
        const techStack = [];
        if (deps.next) techStack.push('Next.js');
        if (deps.react) techStack.push('React');
        if (deps.typescript) techStack.push('TypeScript');
        if (deps['@react-three/fiber']) techStack.push('Three.js/React Three Fiber');
        if (deps['framer-motion']) techStack.push('Framer Motion');
        if (deps.tailwindcss) techStack.push('Tailwind CSS');
        
        const projectType = deps.next ? 'Full-stack Web Application (Portfolio)' : 'Web Application';
        
        return { projectType, techStack: techStack.join(', ') || 'JavaScript' };
      } catch (error) {
        console.warn('⚠️  Could not detect project context:', error.message);
        return { projectType: 'Web Application', techStack: 'JavaScript' };
      }
    };

    const { projectType, techStack } = detectProjectContext();
    console.log(`📋 Project: ${projectType} | Tech: ${techStack}`);

    const DIFF_COMMANDS = ['git diff origin/main...HEAD', 'git diff HEAD~1...HEAD'];
    
    // Files to skip in diff (noise reduction)
    const SKIP_PATTERNS = [
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      'dist/',
      'build/',
      '.next/',
      'node_modules/',
      '*.map',
      '*.bundle.js',
      'coverage/'
    ];

    const filterDiff = (rawDiff) => {
      const lines = rawDiff.split('\n');
      const filtered = [];
      let skipCurrentFile = false;
      
      for (const line of lines) {
        // Check if this is a file header
        if (line.startsWith('diff --git')) {
          const filePath = line.split(' b/')[1] || '';
          skipCurrentFile = SKIP_PATTERNS.some(pattern => {
            if (pattern.includes('*')) {
              const regex = new RegExp(pattern.replace('*', '.*'));
              return regex.test(filePath);
            }
            return filePath.includes(pattern);
          });
          
          if (skipCurrentFile) {
            console.log(`⏭️  Skipping noise file: ${filePath}`);
          }
        }
        
        if (!skipCurrentFile) {
          filtered.push(line);
        }
      }
      
      return filtered.join('\n');
    };

    const fetchDiff = () => {
      for (const command of DIFF_COMMANDS) {
        try {
          console.log(`📦 Fetching diff via "${command}"...`);
          const currentDiff = execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
          if (currentDiff.trim()) {
            return currentDiff;
          }
          console.warn(`⚠️  "${command}" returned an empty diff, trying next option...`);
        } catch (error) {
          console.warn(`⚠️  Failed to run "${command}": ${error.message}`);
        }
      }
      throw new Error('Unable to fetch diff after trying all strategies');
    };

    let diff = filterDiff(fetchDiff());
    
    // Smart truncation: keep beginning and end instead of just truncating at end
    const MAX_DIFF_CHARS = 200_000;
    if (diff.length > MAX_DIFF_CHARS) {
      const keepChars = Math.floor(MAX_DIFF_CHARS / 2);
      const start = diff.slice(0, keepChars);
      const end = diff.slice(-keepChars);
      const truncatedLines = diff.split('\n').length - (start.split('\n').length + end.split('\n').length);
      
      console.warn(`⚠️  Diff too large (${diff.length} chars). Keeping first and last ${keepChars} chars each (truncated ~${truncatedLines} lines in middle).`);
      diff = `${start}\n\n... [${truncatedLines} lines truncated for brevity] ...\n\n${end}`;
    }

    if (!diff || diff.trim().length === 0) {
      console.log('⚠️  No changes detected in diff');
      return;
    }

    const CACHE_DIR = path.join(process.cwd(), '.github', '.cache');
    const CACHE_FILE = path.join(CACHE_DIR, 'code-review-cache.json');
    const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
    const MODEL_VERSION = 'gemini-2.0-flash-v1'; // Update this when changing models
    const cacheKey = `${repoRef}:${MODEL_VERSION}:${createHash('sha256').update(diff).digest('hex')}`;

    const safeReadCache = () => {
      try {
        if (!existsSync(CACHE_FILE)) {
          return {};
        }
        const data = JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
        if (typeof data === 'object' && data !== null) {
          return data;
        }
      } catch (error) {
        console.warn('⚠️  Failed to read review cache, ignoring cache:', error.message);
      }
      return {};
    };

    const cache = safeReadCache();
    const cachedEntry = cache[cacheKey];
    const isCacheFresh = cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL_MS;

    const prompt = `You are a senior code reviewer for a ${projectType} project using ${techStack}.

Review this PR diff and respond with CLEAN, SCANNABLE formatting.

## CRITICAL INSTRUCTIONS:
- Only flag issues you can PROVE from the diff
- If context is missing, qualify with "⚠️ Limited context - verify that..."
- Prioritize runtime failures, security, and scalability over minor optimizations
- Ignore: formatting, naming preferences, comment style, cosmetic changes

## IMPORTANT FORMATTING RULES:
- Use SHORT sentences, not paragraphs
- Add blank lines between sections
- Use code blocks only for examples
- Be concise - reviewers should scan in 10 seconds
- Emojis: 🔒 Security | 🐛 Bug | ⚡ Performance | 🔧 Resources | 🛡️ Errors | 📋 Best Practice

## Review Focus Areas (in order of priority):

1. **Security Issues** 🔒
   - Authentication/authorization bypasses
   - Injection vulnerabilities (SQL, XSS, command injection)
   - Sensitive data exposure (API keys, passwords in logs, hardcoded secrets)
   - Unsafe deserialization or eval usage
   - CORS misconfigurations or insecure headers

2. **Critical Bugs** 🐛
   - Null/undefined crashes or type errors
   - Race conditions or deadlocks
   - Infinite loops or unbounded recursion
   - Breaking changes to public APIs or contracts
   - Logic errors causing incorrect behavior

3. **Performance, Caching & Scalability** ⚡
   - N+1 queries or missing database indexes
   - Unnecessary re-renders or computations (React/Next.js)
   - Missing caching for expensive operations
   - Memory leaks or inefficient algorithms
   - Blocking operations in async contexts
   - Concurrency limits or back-pressure issues

4. **Resource Management** 🔧
   - Unclosed database connections or file handles
   - Missing cleanup in useEffect/componentWillUnmount
   - Event listeners not removed
   - Streams or sockets not closed
   - Memory leaks from circular references

5. **Error Handling** 🛡️
   - Unhandled promise rejections
   - Missing try-catch in critical paths
   - Silent failures without logging
   - Incorrect error propagation or swallowed errors
   - Missing validation for user inputs

6. **Code Quality & Maintainability** 📝
   - Unclear variable/function names (only if severely confusing)
   - Code duplication or violations of DRY principle
   - Insufficient logging for debugging production issues

7. **Best Practices & Standards** 📋
   - Testing gaps (no tests for critical business logic)
   - API design inconsistencies or breaking changes
   - Accessibility issues (for UI components)
   - Missing documentation for complex logic

## RESPONSE FORMAT (STRICT):

**📊 Summary**
[1 sentence: what changed]

**🎯 Issues Found: [X]**

**🔴 Critical: [X] | 🟡 Major: [X] | 🟢 Minor: [X]**

---

**Issues:**

**[Type]** - file.tsx:+123
- Issue: [1 sentence problem]
- Why: [1 sentence impact]
- Fix: [1-2 sentences solution]

*Keep this format for each issue - use blank lines between*

---

**✅ Assessment**
[1-2 sentences: ready to merge? any blockers?]

---

## Rules:
- Be specific: "Line +45 in api.ts" not "in the API file"
- Qualify uncertain feedback: "This may cause..." not "This will cause..."
- If the code is solid, just say "✅ No issues found - code looks good"
- Skip issues that require full codebase context to verify
- Reference line numbers using the diff format (+ for additions, - for deletions)

Git Diff:
\`\`\`
${diff}
\`\`\``;

    const getModelResponse = async () => {
      console.log('🧠 Sending diff to Gemini 2.0 Flash...');
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });

      const reviewText = response?.text;
      if (!reviewText || reviewText.trim().length === 0) {
        throw new Error('Empty response from Gemini model');
      }
      return reviewText;
    };

    const reviewText = isCacheFresh
      ? (() => {
          console.log('♻️  Using cached review to save API quota.');
          return cachedEntry.body;
        })()
      : await getModelResponse();

    if (!isCacheFresh) {
      try {
        mkdirSync(CACHE_DIR, { recursive: true });
        cache[cacheKey] = { body: reviewText, timestamp: Date.now() };
        writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
      } catch (error) {
        console.warn('⚠️  Could not persist review cache:', error.message);
      }
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