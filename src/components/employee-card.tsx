import { ChevronDown } from "lucide-react";
import { cn, getDisplayStatus } from "@/lib/utils";
import type { Employee, StatusType } from "@/shared/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmployeeCardProps {
  employee: Employee;
  onStatusChange: (employeeId: number, newStatus: StatusType) => void;
}

export function EmployeeCard({ employee, onStatusChange }: EmployeeCardProps) {
  const statusOptions: StatusType[] = [
    "Working",
    "OnVacation",
    "BusinessTrip",
    "LunchTime",
  ];

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case "Working":
        return "bg-green-500";
      case "OnVacation":
        return "bg-red-500";
      case "BusinessTrip":
        return "bg-purple-500";
      case "LunchTime":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 flex items-center gap-8 shadow-[5px_5px_15px_rgba(59,130,246,0.1)] hover:shadow-[8px_8px_20px_rgba(59,130,246,0.6)] transition-shadow">
      <div className="relative h-48 w-48 flex-shrink-0">
        <img
          src={employee.avatar || "/placeholder.svg"}
          alt={employee.name}
          className="h-full w-full rounded-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-medium text-gray-800">{employee.name}</h3>

        <div className="flex items-center mt-2">
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full mr-2",
              getStatusColor(employee.status)
            )}
          ></span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm text-gray-600 flex items-center border-b border-gray-200 pb-1 hover:border-gray-400 min-w-[140px] pr-12 relative">
                {getDisplayStatus(employee.status)}
                <ChevronDown className="h-4 w-4 absolute right-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              {statusOptions.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => onStatusChange(employee.id, status)}
                  className={cn(
                    "cursor-pointer flex items-center py-3",
                    employee.status === status && "font-medium"
                  )}
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full mr-2",
                      getStatusColor(status)
                    )}
                  ></span>
                  {getDisplayStatus(status)}
                  {employee.status === status && (
                    <span className="ml-auto text-xs text-gray-500">
                      Current
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
