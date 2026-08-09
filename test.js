/* eslint-disable */
require("dotenv").config({ path: ".env.local" });
const { GoogleGenAI } = require("@google/genai");
const { EXPLAIN_PROMPT, buildPrompt } = require("./src/lib/aiPrompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function verify() {
  console.log("=== Testing Explain Prompt ===");
  const javaCode = `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Iteration: " + i);
        }
    }
}`;

  const prompt = buildPrompt(EXPLAIN_PROMPT, {
    language: "java",
    fileContent: javaCode,
  });

  try {
    const res = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        temperature: 0.2,
        topP: 0.8,
        maxOutputTokens: 800,
      },
    });
    console.log("Response Text:\n", res.text.trim());
    console.log("✅ Explain Test SUCCESSFUL!");
  } catch (err) {
    console.error("❌ Verification FAILED:", err);
  }
}

verify();