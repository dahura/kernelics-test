import { Search, X, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDisplayStatus } from "@/lib/utils";
import type { StatusType } from "@/shared/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmployeeFiltersProps {
  searchTerm: string;
  statusFilter: StatusType | "All";
  statusOptions: (StatusType | "All")[];
  hasActiveStatusFilter: boolean;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: StatusType | "All") => void;
  clearSearch: () => void;
  resetStatusFilter: () => void;
}

export const EmployeeFilters = ({
  searchTerm,
  statusFilter,
  statusOptions,
  hasActiveStatusFilter,
  setSearchTerm,
  setStatusFilter,
  clearSearch,
  resetStatusFilter,
}: EmployeeFiltersProps) => {
  return (
    <div className="w-full flex-grow flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          className="pl-10 pr-10 h-12 border-gray-200 w-full"
          placeholder="Type to search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between h-12 border-gray-200"
              >
                {statusFilter === "All"
                  ? "Filter by status"
                  : getDisplayStatus(statusFilter)}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {statusOptions.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className="cursor-pointer"
                >
                  {status === "All"
                    ? "All"
                    : getDisplayStatus(status as StatusType)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {hasActiveStatusFilter && (
          <Button
            variant="ghost"
            className="h-12 text-gray-500 hover:text-gray-700 flex-shrink-0 flex items-center gap-1"
            onClick={resetStatusFilter}
            aria-label="Reset status filter"
          >
            <RotateCcw className="h-4 w-4" />
            Reset filters
          </Button>
        )}
      </div>
    </div>
  );
};
