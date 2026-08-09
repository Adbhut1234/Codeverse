export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  time: string | null;
  memory: number | null;
  status: {
    id: number;
    description: string;
  };
}

export class CompilerService {
  static async execute(
    code: string,
    language: string,
    stdin: string = ""
  ): Promise<ExecutionResult> {
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        language,
        stdin,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Execution failed with status: ${response.status}`);
    }

    return data as ExecutionResult;
  }
}
