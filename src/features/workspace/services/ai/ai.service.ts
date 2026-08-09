import { AIRequestPayload } from "../../types/ai";
import {
  EXECUTION_ANALYSIS_SUCCESS_PROMPT,
  EXECUTION_ANALYSIS_COMPILE_ERROR_PROMPT,
  EXECUTION_ANALYSIS_RUNTIME_ERROR_PROMPT,
  EXPLAIN_PROMPT,
  DEBUG_PROMPT,
  TEST_CASE_PROMPT,
  INTERVIEW_PROMPT,
  FIX_CODE_PROMPT,
  buildPrompt,
} from "@/lib/aiPrompts";

export class AIService {
  static async askCodeIntelligence(payload: AIRequestPayload): Promise<string> {
    // Ensure Puter is loaded
    if (!(window as any).puter) {
      throw new Error("Puter.js is not loaded. Please wait a moment and try again.");
    }

    let systemPrompt = "";
    let executionMetadata = "";

    if (payload.intent === "execution_analysis") {
      const exec = payload.executionResult || {};
      const hasCompileError = Boolean(exec.compile_output);
      const isAccepted = exec.status?.description === "Accepted" || (exec.status?.id === 3);
      const hasRuntimeError = Boolean(exec.stderr) || (!isAccepted && !hasCompileError);

      if (hasCompileError) {
        systemPrompt = EXECUTION_ANALYSIS_COMPILE_ERROR_PROMPT;
      } else if (hasRuntimeError) {
        systemPrompt = EXECUTION_ANALYSIS_RUNTIME_ERROR_PROMPT;
      } else {
        systemPrompt = EXECUTION_ANALYSIS_SUCCESS_PROMPT;
      }

      executionMetadata += `Status: ${exec.status?.description || "Completed"}\n`;
      executionMetadata += `Execution Time: ${exec.time || "N/A"} s\n`;
      executionMetadata += `Memory Usage: ${exec.memory || "N/A"} KB\n`;
      if (exec.compile_output) executionMetadata += `Compiler Output:\n\`\`\`\n${exec.compile_output}\n\`\`\`\n`;
      if (exec.stdout) executionMetadata += `Standard Output:\n\`\`\`\n${exec.stdout}\n\`\`\`\n`;
      if (exec.stderr) executionMetadata += `Standard Error:\n\`\`\`\n${exec.stderr}\n\`\`\`\n`;
    } else if (payload.intent === "explain") {
      systemPrompt = EXPLAIN_PROMPT;
    } else if (payload.intent === "debug") {
      systemPrompt = DEBUG_PROMPT;
    } else if (payload.intent === "test_cases") {
      systemPrompt = TEST_CASE_PROMPT;
    } else if (payload.intent === "interview") {
      systemPrompt = INTERVIEW_PROMPT;
    } else if (payload.intent === "fix_code") {
      systemPrompt = FIX_CODE_PROMPT;
    } else {
      systemPrompt = payload.userPrompt 
        ? "Answer the user query concisely as a helpful IDE coding assistant."
        : "Answer the following question about the code.";
    }

    const prompt = buildPrompt(systemPrompt, {
      language: payload.language,
      fileContent: payload.fileContent,
      selectedText: payload.selectedText,
      userPrompt: payload.userPrompt,
      executionMetadata: executionMetadata || undefined,
    });

    try {
      const response = await (window as any).puter.ai.chat(prompt);
      // Puter returns an object with a message property or a string directly depending on version, 
      // usually it returns an object { toString: () => string, message: { content: "..."} }
      return response.message?.content || response.toString();
    } catch (error: any) {
      throw new Error(error.message || "Failed to generate AI response via Puter.js");
    }
  }
}
