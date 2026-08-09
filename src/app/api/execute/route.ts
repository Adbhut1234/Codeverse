import { NextResponse } from "next/server";

// Wandbox API Language Mapping
const LANGUAGE_MAP: Record<string, string> = {
  python: "cpython-3.13.8",
  c: "gcc-13.2.0-c",
  cpp: "gcc-13.2.0",
  java: "openjdk-jdk-22+36",
  javascript: "nodejs-20.17.0",
  typescript: "typescript-5.6.2",
};

export async function POST(req: Request) {
  try {
    const { code, language, stdin } = await req.json();

    const mappedCompiler = LANGUAGE_MAP[language];
    
    if (!mappedCompiler) {
      return NextResponse.json({ error: `Unsupported language: ${language}` }, { status: 400 });
    }

    const WANDBOX_API_URL = "https://wandbox.org/api/compile.json";

    const requestBody = {
      compiler: mappedCompiler,
      code: code,
      stdin: stdin || "",
    };

    const submitRes = await fetch(WANDBOX_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!submitRes.ok) {
      const errorText = await submitRes.text();
      throw new Error(`Failed to execute code via Wandbox API: ${submitRes.statusText} - ${errorText}`);
    }

    const data = await submitRes.json();

    const isSuccess = data.status === "0";

    const formattedResponse = {
      stdout: data.program_output || data.program_message || "",
      stderr: data.program_error || "",
      compile_output: data.compiler_error || data.compiler_message || "",
      status: {
        id: isSuccess ? 3 : (data.compiler_error ? 6 : 4), 
        description: isSuccess ? "Accepted" : (data.compiler_error ? "Compilation Error" : "Runtime Error")
      },
      time: 0.0,
      memory: 0
    };

    return NextResponse.json(formattedResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Execution failed with unknown error" }, { status: 500 });
    }
  }
}
