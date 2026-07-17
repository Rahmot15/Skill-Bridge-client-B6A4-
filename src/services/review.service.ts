"use server";

import { API_BASE_URL } from "@/lib/api-base-url";
import { cookies } from "next/headers";


export const reviewService = {
  async createReview(payload: {
    tutorId: string;
    bookingId: string;
    rating: number;
    comment: string;
  }) {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  },
};
