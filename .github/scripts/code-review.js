import { GoogleGenerativeAI } from "@google/generative-ai";
import { execSync } from "child_process";
import { Octokit } from "@octokit/rest";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Get repo and PR context from GitHub Actions
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const prNumber = process.env.GITHUB_REF.match(/(\d+)$/)[0];

// Get PR diff
const diff = execSync(`git diff origin/main...HEAD`).toString();

const prompt = `
You are an experienced code reviewer. Analyze the following Git diff.
Identify potential bugs, bad practices, missing error handling, or performance issues.
Respond in this format:

[filename]:[line_number] - [short summary]
[explanation of the problem and suggestion]

Diff:
${diff}
`;

const response = await model.generateContent(prompt);
const reviewText = response.response.text();

// Post the review as a PR comment
await octokit.issues.createComment({
  owner,
  repo,
  issue_number: prNumber,
  body: `🤖 **Gemini Code Review Bot** says:\n\n${reviewText}`,
});

console.log("✅ Review posted!");
