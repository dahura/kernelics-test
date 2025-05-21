import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { StatusType } from "@/shared/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDisplayStatus(status: StatusType): string {
  switch (status) {
    case "Working":
      return "Working";
    case "OnVacation":
      return "On Vacation";
    case "BusinessTrip":
      return "Business Trip";
    case "LunchTime":
      return "Lunch Time";
    default:
      return status;
  }
}
