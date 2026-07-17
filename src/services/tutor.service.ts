import { API_BASE_URL } from "@/lib/api-base-url";
import { cookies } from "next/headers";

export const tutorService = {
  async getMyProfile() {
    try {
      const cookieStore = await cookies();

      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(`${API_BASE_URL}/api/tutors/me`, {
        next: { revalidate: 60 },
        headers: {
          cookie: cookieHeader,
        },
      });

      if (!res.ok) return { success: false, data: null };

      return await res.json();
    } catch {
      return { success: false, data: null };
    }
  },

  async updateAvailability(availability: string) {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/api/tutors/availability`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      body: JSON.stringify({ availability }),
    });

    return res.json();
  },

  async updateProfile(payload: {
    title?: string;
    bio?: string;
    education?: string;
    experienceYears?: number;
    hourlyRate?: number;
    languages?: string[];
  }) {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/api/tutors/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  },

  async getTutorBookings() {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/api/bookings/tutor`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieHeader,
      },
    });

    return res.json();
  },
};
