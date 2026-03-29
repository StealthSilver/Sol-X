import { Prisma } from "@prisma/client";
import type { Response } from "express";
import type { ApiResponse } from "../types/auth.types";

const CONNECTION_CODES = new Set([
  "P1001", // Can't reach database server
  "P1017", // Server has closed the connection
  "P1013", // Invalid database string (misconfiguration)
]);

export function isDbConnectionError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    CONNECTION_CODES.has(error.code)
  );
}

/** One-line logs for connection issues; full log for other Prisma errors */
export function logPrismaError(context: string, error: unknown): void {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (CONNECTION_CODES.has(error.code)) {
      console.error(
        `[${context}] Database unavailable (${error.code}). Check DATABASE_URL, Neon project status, and avoid multiple PrismaClient instances.`,
      );
      return;
    }
  }
  console.error(`[${context}]`, error);
}

export function sendPrismaFailure(
  res: Response,
  context: string,
  error: unknown,
  defaultMessage: string,
) {
  logPrismaError(context, error);
  const conn = isDbConnectionError(error);
  return res.status(conn ? 503 : 500).json({
    success: false,
    error: conn
      ? "Database temporarily unavailable. Check DATABASE_URL or try again shortly."
      : defaultMessage,
  } as ApiResponse);
}
