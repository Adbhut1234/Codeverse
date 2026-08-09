export type AIIntent = 
  | "explain" 
  | "debug" 
  | "test_cases" 
  | "interview" 
  | "execution_analysis" 
  | "fix_code"
  | "general";

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIExecutionResult {
  compile_output?: string | null;
  stdout?: string | null;
  stderr?: string | null;
  status?: { id: number; description: string };
  time?: string | null;
  memory?: number | null;
}

export interface AIRequestPayload {
  intent: AIIntent;
  fileContent?: string;
  language?: string;
  selectedText?: string;
  userPrompt?: string;
  executionResult?: AIExecutionResult;
}

