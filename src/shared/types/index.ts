export type Status = "idle" | "loading" | "success" | "error";

export interface APIError {
  message: string;
  code?: string;
  status?: number;
}
