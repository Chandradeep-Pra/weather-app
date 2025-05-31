"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative w-full h-3 overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-3 w-3 shadow-lg z-10 rounded-full shadow-white ring-2 dark:ring-gray-600 flex-1 transition-all"
        style={{ marginLeft:`calc(${value}% - 0.8rem)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
