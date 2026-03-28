import type { Request } from "express";

/**
 * Express 5 types route params as `string | string[]`. Prisma and most handlers
 * need a single string.
 */
export function routeStringParam(
  req: Request,
  key: string = "id",
): string {
  const v = req.params[key];
  if (v === undefined || v === null) return "";
  if (Array.isArray(v)) return v[0] ?? "";
  return v;
}
