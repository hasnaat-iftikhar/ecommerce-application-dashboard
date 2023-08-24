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

export function formatISODate(inputDate: string): string {
  const parsedDate = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  const formattedDate = parsedDate.toLocaleDateString("en-US", options);
  return formattedDate;
}
