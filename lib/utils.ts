import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createErrorResponse(message: string, status: number): Response {
  const responseBody = JSON.stringify({ error: true, message });
  return new Response(responseBody, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
