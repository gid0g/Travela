import { getSearch } from "../queries/attraction.queries";
import { addSearch } from "../action/attraction.action";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddSearch = () => {
  return useMutation({
    mutationFn: addSearch,
    onSuccess: async (data) => {
      console.log("success", data);
    },
    onError: async (error) => {
      console.error("error", error);
    },
  });
};

export const useGetSearch = () => {
  return useQuery({
    queryKey: ["searches"],
    queryFn: getSearch,
  });
};
