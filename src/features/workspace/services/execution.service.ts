import { ExecutionResult } from "../types";

export const executeCode = async (code: string, language: string): Promise<ExecutionResult> => {
  const response = await fetch("/api/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  });
  
  if (!response.ok) {
    throw new Error("Execution failed");
  }
  
  return response.json();
};
