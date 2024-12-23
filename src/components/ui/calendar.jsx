import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "src/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-white hover:bg-white hover:text-black transition-colors",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white hover:bg-white hover:text-black transition-colors"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse border border-white",  // Add border to the table
        head_row: "flex justify-between text-white",
        head_cell: "w-8 text-center text-sm font-medium",
        row: "flex w-full mt-2",
        cell: cn(
          "relative flex items-center justify-center p-0 text-center text-sm border border-white", // Add border to each cell
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 m-1 font-normal text-white aria-selected:opacity-100 hover:bg-white hover:text-black transition-colors"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-gray-600 text-white hover:bg-gray-500 hover:text-white focus:bg-gray-700 focus:text-white",
        day_today: "bg-black text-white",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "bg-accent text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn("h-4 w-4 text-white hover:text-black", className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn("h-4 w-4 text-white hover:text-black", className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
