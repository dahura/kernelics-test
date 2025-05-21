import { useState, useEffect } from "react";
import type { Employee, StatusType } from "@/shared/types";

type FilterOptions = {
  initialSearch?: string;
  initialStatus?: StatusType | "All";
};

export function useSearch(employees: Employee[], options: FilterOptions = {}) {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("search") || options.initialSearch || "";
  });

  const [statusFilter, setStatusFilter] = useState<StatusType | "All">(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (
      status &&
      ["Working", "OnVacation", "BusinessTrip", "LunchTime"].includes(status)
    ) {
      return status as StatusType;
    }
    return options.initialStatus || "All";
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set("search", searchTerm);
    }

    if (statusFilter !== "All") {
      params.set("status", statusFilter);
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [searchTerm, statusFilter]);

  const filteredEmployees = employees.filter((employee: Employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || employee.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const clearSearch = () => {
    setSearchTerm("");
  };

  const resetStatusFilter = () => {
    setStatusFilter("All");
  };

  const hasActiveFilters = searchTerm !== "" || statusFilter !== "All";
  const hasActiveStatusFilter = statusFilter !== "All";
  const hasActiveSearchFilter = searchTerm !== "";

  const statusOptions: (StatusType | "All")[] = [
    "All",
    "Working",
    "OnVacation",
    "BusinessTrip",
    "LunchTime",
  ];

  return {
    searchTerm,
    statusFilter,
    filteredEmployees,

    setSearchTerm,
    setStatusFilter,

    clearSearch,
    resetStatusFilter,

    hasActiveFilters,
    hasActiveStatusFilter,
    hasActiveSearchFilter,

    statusOptions,
  };
}
