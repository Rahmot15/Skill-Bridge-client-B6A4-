"use client";

import { useState } from "react";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ReviewForm({
  tutorId,
  tutorName,
  bookingId,
  onSuccess,
}: {
  tutorId: string;
  tutorName: string;
  bookingId: string;
  onSuccess?: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/reviews`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tutorId,
            bookingId,
            rating,
            comment: comment || undefined,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed");
      }

      toast.success("Review submitted!", {
        description: `Thank you for reviewing ${tutorName}.`,
      });

      setRating(0);
      setComment("");
      onSuccess?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Please try again.";
      toast.error("Failed to submit review", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5">
      <div className="mb-4">
        <h3 className="text-[14px] font-bold text-zinc-800">Leave a Review</h3>
        <p className="text-[12px] text-zinc-400">Share your experience with {tutorName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star rating */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  size={24}
                  className={cn(
                    "transition-colors",
                    s <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-zinc-200"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Comment <span className="normal-case tracking-normal font-normal text-zinc-300">— optional</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="How was your experience? What did you learn?"
            rows={3}
            className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-[13px] text-zinc-700 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-2.5 text-[13px] font-bold text-zinc-900 shadow-sm hover:bg-yellow-500 disabled:opacity-60 transition"
        >
          {isSubmitting ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-800 border-t-transparent" />
          ) : (
            <Send size={13} />
          )}
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
