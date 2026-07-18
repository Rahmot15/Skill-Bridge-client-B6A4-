import { API_BASE_URL } from "@/lib/api-base-url";
import { cookies } from "next/headers";

export const adminService = {
  async getUsers() {
    try {
      const cookieStore = await cookies();

      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
        next: { revalidate: 60 },
        headers: {
          cookie: cookieHeader,
        },
      });

      if (!res.ok) return { success: false, data: [] };

      return await res.json();
    } catch {
      return { success: false, data: [] };
    }
  },

  async getBookings() {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/api/admin/bookings`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieHeader,
      },
    });

    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_BASE_URL}/api/categories`, {
      next: { revalidate: 60 },
    });

    return res.json();
  },

  async getAllBookings() {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/api/admin/bookings`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieHeader,
      },
    });

    return res.json();
  },

  async createCategory(payload: { title: string; description: string }) {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader
      },
      body: JSON.stringify(payload),
    });

    return res.json();
  },

  async getStats() {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
      next: { revalidate: 60 },
      headers: {
        cookie: cookieHeader,
      },
    });

    if (!res.ok) return { success: false, data: null };

    return res.json();
  },
};
