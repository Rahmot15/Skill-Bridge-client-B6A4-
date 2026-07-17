import { env } from "@/env";

export const API_BASE_URL =
  env.API_URL ??
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_SERVER_BASE_URL ??
  "https://skill-bridge-server-woad.vercel.app";
