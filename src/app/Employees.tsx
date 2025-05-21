import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmployeeCard } from "@/components/employee-card";
import { useSearch } from "@/hooks/useSearch";
import { EmployeeFilters } from "@/components/employee-filters";
import type { StatusType } from "@/shared/types";
import { AddEmployeeModal } from "@/components/add-employee-modal";
import type { Employee } from "@/shared/types";
import { useGetEmployees } from "@/hooks/query/useGetUsers";
import { useChangeEmployeeStatus } from "@/hooks/query/useChangeUserStatus";
import { useAddEmployee } from "@/hooks/query/useAddEmployee";

export const EmployeeDashboard = () => {
  const { data: employees = [] } = useGetEmployees();
  const { mutate: changeStatus } = useChangeEmployeeStatus();
  const { mutate: addEmployee } = useAddEmployee();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    searchTerm,
    statusFilter,
    filteredEmployees,
    setSearchTerm,
    setStatusFilter,
    clearSearch,
    resetStatusFilter,
    hasActiveStatusFilter,
    statusOptions,
  } = useSearch(employees);

  const handleStatusChange = (employeeId: number, newStatus: StatusType) => {
    changeStatus({ employeeId: employeeId.toString(), status: newStatus });
  };

  const handleAddEmployee = (newEmployee: Omit<Employee, "id">) => {
    addEmployee(newEmployee);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-normal text-sky-500">Employees</h1>
          <Button
            variant="outline"
            className="text-sky-500 border-sky-500 hover:bg-sky-50"
          >
            Log Out
          </Button>
        </header>

        <div className="bg-gray-50 p-6 rounded-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <Button
              className="bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2 w-fit px-6 py-2 h-12 md:w-auto flex-shrink-0"
              onClick={() => setIsAddModalOpen(true)}
            >
              Create <Plus className="h-5 w-5" />
            </Button>

            <EmployeeFilters
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              statusOptions={statusOptions}
              hasActiveStatusFilter={hasActiveStatusFilter}
              setSearchTerm={setSearchTerm}
              setStatusFilter={setStatusFilter}
              clearSearch={clearSearch}
              resetStatusFilter={resetStatusFilter}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee: Employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-500">
              No employees match your search criteria
            </div>
          )}
        </div>

        <AddEmployeeModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddEmployee={handleAddEmployee}
        />
      </div>
    </div>
  );
};
