import { API_URL } from "@/shared/constants";
import type { StatusType } from "@/shared/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateEmployeeStatus = async ({
  employeeId,
  status,
}: {
  employeeId: string;
  status: StatusType;
}) => {
  const response = await fetch(`${API_URL}/users/${employeeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update employee status");
  }

  return response.json();
};

export const useChangeEmployeeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployeeStatus,
    onSuccess: (data) => {
      queryClient.setQueryData(["employees"], data);
    },
  });
};
