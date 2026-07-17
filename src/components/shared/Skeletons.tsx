import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Skeleton className="h-3 w-24 rounded-lg" />
          <Skeleton className="mt-2 h-7 w-48 rounded-lg" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="mt-3 h-7 w-16 rounded-lg" />
              <Skeleton className="mt-1 h-3 w-20 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-4 w-32 rounded-lg" />
                <Skeleton className="h-3 w-16 rounded-lg" />
              </div>
              <Skeleton className="h-[200px] w-full rounded-xl" />
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-50 px-5 py-4">
            <Skeleton className="h-4 w-36 rounded-lg" />
            <Skeleton className="h-3 w-16 rounded-lg" />
          </div>
          <div className="px-3 py-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl px-3 py-3">
                <Skeleton className="h-9 w-9 rounded-xl" />
                <div className="flex-1">
                  <Skeleton className="h-3.5 w-32 rounded-lg" />
                  <Skeleton className="mt-1 h-2.5 w-20 rounded-lg" />
                </div>
                <Skeleton className="h-3 w-16 rounded-lg" />
                <Skeleton className="h-6 w-20 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TutorDetailSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <div className="bg-white border-b border-zinc-100">
        <Skeleton className="h-1 w-full" />
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Skeleton className="h-9 w-32 rounded-xl mb-6" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Skeleton className="h-24 w-24 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-48 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded-lg" />
              <div className="flex gap-4 mt-2">
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-24 rounded-lg" />
                <Skeleton className="h-4 w-20 rounded-lg" />
                <Skeleton className="h-4 w-16 rounded-lg" />
              </div>
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-12 w-32 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-100 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex gap-0">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-24 rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="mt-2 h-4 w-3/4 rounded-lg" />
              <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FindTutorsSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Skeleton className="h-5 w-28 rounded-lg" />
            <Skeleton className="h-10 flex-1 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Skeleton className="h-14 w-14 rounded-xl" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 rounded-lg" />
                  <Skeleton className="mt-1 h-3 w-24 rounded-lg" />
                  <div className="mt-2 flex gap-3">
                    <Skeleton className="h-3 w-16 rounded-lg" />
                    <Skeleton className="h-3 w-20 rounded-lg" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-6 w-12 rounded-lg" />
                  <Skeleton className="mt-1 h-2.5 w-8 rounded-lg" />
                </div>
              </div>
              <Skeleton className="mt-3 h-3 w-full rounded-lg" />
              <Skeleton className="mt-1 h-3 w-2/3 rounded-lg" />
              <div className="mt-3 flex gap-1.5">
                <Skeleton className="h-5 w-14 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-3 w-20 rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BookingCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-4 w-32 rounded-lg" />
              <Skeleton className="mt-1 h-3 w-40 rounded-lg" />
            </div>
            <Skeleton className="h-6 w-20 rounded-lg" />
          </div>
          <div className="mt-2 flex gap-3">
            <Skeleton className="h-3 w-24 rounded-lg" />
            <Skeleton className="h-3 w-28 rounded-lg" />
          </div>
          <Skeleton className="mt-3 h-16 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
