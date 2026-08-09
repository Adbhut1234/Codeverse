export interface AIContext {
  code: string;
  language: string;
  lineRange?: [number, number];
}

export interface ExecutionResult {
  stdout: string;
  stderr?: string;
  status: { id: number; description: string };
  executionTimeMs?: number;
}
