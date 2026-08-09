export const chatWithAI = async (messages: Record<string, unknown>[], codeContext: Record<string, unknown>) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, codeContext }),
  });
  
  if (!response.ok) {
    throw new Error("Chat failed");
  }
  
  return response.json();
};
