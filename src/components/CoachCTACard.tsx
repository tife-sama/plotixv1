"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "./ui/badge";
import { Coaches } from "@/collections/Coaches/Coaches";

export const CoachCTACard: React.FC = () => {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="md:hidden flex flex-col items-end">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full text-center font-normal mb-2 mt-3",
              !date && "text-white"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-center items-center justify-center" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span className="text-center items-center justify-center">
                Book a session
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            //   initialFocus
          />
          <Button className="w-full mb-4 items-center justify-center">
            Proceed to payment
          </Button>
        </PopoverContent>
      </Popover>

      {/* Message */}
      <Badge
        variant={"outline"}
        className="flex items-center justify-center p-3.5 w-full hover:bg-gray-100"
      >
        {" "}
        Message {Coaches.name}
      </Badge>
    </div>
  );
};

export default CoachCTACard;
