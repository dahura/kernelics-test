import { API_URL } from "@/shared/constants";
import type { Employee } from "@/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type NewEmployeeData = Omit<Employee, "id">;

const addEmployee = async (employeeData: NewEmployeeData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return response.json();
};

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployee,
    onSuccess: (data) => {
      queryClient.setQueryData(["employees"], data);
    },
  });
};
