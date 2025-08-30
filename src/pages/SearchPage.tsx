import { useState, useEffect } from "react";
import { useDeferredValue } from "react";
import type { SearchResult } from "../types/search.types";
import { useNavigate } from "react-router";
import { Header, SearchBar, SearchResults } from "../components/Search";
import type { ApiResponse, ExtractedHotel } from "../types/result.types";
import { placeHolder } from "../data/placeHolder";
import { mapToRecentSearches, mapToSearch } from "../utils/helper";
import { extractSelectedData } from "../utils/extractor";
import {
  useGetAttractionByPartialText,
  useGetAttraction,
} from "../hooks/useAttraction";
import { useAttractionStore } from "../store/attraction.store";
import { handleComponentError } from "../utils/errorUtils";
import ErrorBoundary from "../components/ErrorBoundary";

function SearchPage() {
  const setAttraction = useAttractionStore((state) => state?.setAttraction);
  const query = extractSelectedData(placeHolder as ApiResponse);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);
  const navigate = useNavigate();

  const recentSearches: SearchResult[] = mapToRecentSearches(
    query as ExtractedHotel[]
  );

  const { data: attraction, isFetching } =
    useGetAttractionByPartialText(deferredQuery);
  const { data: SelectedAttraction, isSuccess } = useGetAttraction(searchTerm);
  const liveResults: SearchResult[] =
    attraction && attraction.items
      ? mapToSearch([
          {
            ...attraction,
            items: attraction.items.map((hotel) => ({
              title: hotel?.title || "Unknown Title",
              secondaryInfo: hotel?.secondaryInfo || "Unknown Location",
              bubbleRating_count: hotel?.bubbleRating_count || 0,
              bubbleRating_rating: hotel?.bubbleRating_rating || 0,
              cardPhotos: hotel?.cardPhotos || [],
              travelTimes: hotel?.travelTimes || {
                duration: "",
                walkTime: "",
                driveTime: "",
                alternateTime: "",
              },
            })),
          },
        ])
      : [];
  useEffect(() => {
    if (isSuccess && SelectedAttraction) {
      setAttraction(SelectedAttraction as ExtractedHotel);
      navigate("/results");
    }
  }, [isSuccess, SelectedAttraction, navigate, setAttraction]);
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleResultClick = (result: SearchResult) => {
    try {
      console.log("result", result?.name);
      setSearchTerm(result?.name);
    } catch (error) {
      handleComponentError(error, "SearchPage.handleResultClick");
    }
  };

  const resultsToShow = deferredQuery.length > 0 ? liveResults : recentSearches;

  return (
    <ErrorBoundary>
      <div className="min-vh-100 bg-white">
        <div className="position-sticky z-1 top-0 bg-light">
          <Header title="Where to?" />
        </div>

        <main>
          <div className="container-fluid p-0">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Reserves"
            />

            <div className="mt-2">
              {isFetching ? (
                <p className="text-center">Searching...</p>
              ) : (
                <SearchResults
                  results={resultsToShow}
                  onResultClick={handleResultClick}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default SearchPage;
