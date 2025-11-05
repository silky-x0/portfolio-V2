import { GoogleGenerativeAI } from "@google/genai";
import { execSync } from "child_process";
import { Octokit } from "@octokit/rest";

(async () => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const repoRef = process.env.GITHUB_REPOSITORY;
    const ref = process.env.GITHUB_REF;

    if (!GEMINI_API_KEY || !GITHUB_TOKEN || !repoRef || !ref) {
      throw new Error("Missing environment variables");
    }

    const [owner, repo] = repoRef.split("/");
    const prMatch = ref.match(/(\d+)$/);
    if (!prMatch) throw new Error("Could not extract PR number");
    const prNumber = parseInt(prMatch[1], 10);

    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const genAI = new GoogleGenerativeAI({ apiKey: GEMINI_API_KEY });
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log("📦 Fetching diff...");
    const diff = execSync(`git diff origin/main...HEAD`, { encoding: "utf8" });

    const prompt = `
You are an experienced software engineer performing a code review.
Analyze the following Git diff and provide concise, actionable feedback.
Respond in this format:

[filename]:[line_number] - [short summary]
[brief explanation and suggestion]

Only mention relevant findings — ignore trivial style changes.

Diff:
${diff}
`;

    console.log("🧠 Sending diff to Gemini 1.5 Flash...");
    const result = await model.generateContent(prompt);
    const reviewText = await result.response.text();

    console.log("💬 Posting review comment...");
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: `🤖 **Gemini 1.5 Flash Review Bot** says:\n\n${reviewText}`,
    });

    console.log("✅ Review posted successfully!");
  } catch (err) {
    console.error("❌ Error during review:", err);
    process.exit(1);
  }
})();
