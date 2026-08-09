import { useState } from "react";
import { AIMessage, AIIntent, AIRequestPayload, AIExecutionResult } from "../types/ai";
import { AIService } from "../services/ai/ai.service";

export function useAI() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const askAI = async (
    intent: AIIntent,
    fileContent: string = "",
    language: string = "",
    selectedText: string = "",
    userPrompt: string = "",
    executionResult?: AIExecutionResult
  ): Promise<string | void> => {
    if (isGenerating) return;

    // Build the user message for display
    let displayMessage = "";
    if (intent === "execution_analysis") {
      const isError = Boolean(executionResult?.compile_output || executionResult?.stderr || (executionResult?.status && executionResult.status.id !== 3));
      displayMessage = isError 
        ? "⚡ Automated Execution Analysis: Error Detected" 
        : "⚡ Automated Execution Analysis: Execution Successful";
    } else if (intent !== "general") {
      const intentMap: Record<string, string> = {
        explain: "Explain this code.",
        debug: "Find bugs in this code.",
        test_cases: "Generate test cases for this code.",
        interview: "Generate interview questions for this code.",
        fix_code: "Fix this code.",
      };
      displayMessage = intentMap[intent] || intent;
      if (selectedText) {
         displayMessage += ` (Applied to selection)`;
      }
    } else {
      displayMessage = userPrompt;
    }

    const newUserMsg: AIMessage = { role: "user", content: displayMessage };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsGenerating(true);

    try {
      const payload: AIRequestPayload = {
        intent,
        fileContent,
        language,
        selectedText,
        userPrompt,
        executionResult,
      };

      const responseText = await AIService.askCodeIntelligence(payload);
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: responseText },
      ]);
      return responseText;
    } catch (error: unknown) {
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: `**Error:** ${error instanceof Error ? error.message : "An unexpected error occurred."}` 
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearMessages = () => setMessages([]);

  return {
    messages,
    isGenerating,
    askAI,
    clearMessages,
  };
}
