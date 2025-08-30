import {
  getAttraction,
  getAttractionByTitle,
  getAttractionByPartialText
} from "../queries/attraction.queries";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import type { AttractionResponse, ExtractedHotel } from "../types/result.types";

export const useAllAttractions = () =>
  useInfiniteQuery<AttractionResponse>({
    queryKey: ["attractions"],
    queryFn: ({ pageParam }) =>
      getAttraction({ pageParam: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.total_pages) {
        return undefined;
      }
      return lastPage.page + 1;
    },
  });

export const useGetAttraction = (title: string) => {
  return useQuery<ExtractedHotel, Error>({
    queryKey: ["attraction", title],
    queryFn: () => getAttractionByTitle(title),
    enabled: !!title,
  });
};
export const useGetAttractionByPartialText = (title: string) => {
  return useQuery<AttractionResponse, Error>({
    queryKey: ["attraction", title],
    queryFn: () => getAttractionByPartialText(title),
    enabled: !!title,
  });
};


