"use client"

import { useEffect } from "react"
import RouteErrorViewClient from "@/components/shared/RouteErrorViewClient"

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <RouteErrorViewClient
      title="Request could not be completed"
      description="A temporary issue interrupted this route. Please retry now."
      onRetry={reset}
    />
  )
}
