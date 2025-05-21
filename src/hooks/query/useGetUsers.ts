import { API_URL } from "@/shared/constants";

import { useQuery } from "@tanstack/react-query";

const fetchEmployees = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return response.json();
};

export const useGetEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
};
