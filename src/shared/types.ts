export type StatusType =
  | "Working"
  | "OnVacation"
  | "LunchTime"
  | "BusinessTrip";

export interface Employee {
  id: number;
  name: string;
  avatar: string;
  status: StatusType;
}
