import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({ className, classNames = {}, ...props }: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        caption: "flex justify-between items-center pt-1",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 opacity-70 hover:opacity-100"
        ),
        nav_button_previous: "left-1",
        nav_button_next: "right-1",
        table: "w-full space-y-1",
        head_row: "flex",
        head_cell: "w-9 text-muted-foreground text-[0.8rem] font-normal",
        row: "flex mt-2",
        cell: "w-9 h-9 text-sm text-center p-0 relative",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0"),
        day_selected: "bg-primary text-white",
        day_today: "bg-accent text-white",
        day_outside: "text-muted-foreground opacity-50",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
};

Calendar.displayName = "Calendar";
export { Calendar };
