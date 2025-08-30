import { nanoid } from "nanoid";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { SearchBar } from "../components/Search";
import { Header, AttractionCard } from "../components/HomeComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAllAttractions } from "../hooks/useAttraction";
import { CardSkeleton } from "../skeleton/AttractionCardSkeleton";
import ErrorBoundary from "../components/ErrorBoundary";
import { handleComponentError } from "../utils/errorUtils";
function Home() {
  const {
    data: allAttractions,
    fetchNextPage,
    hasNextPage,
  } = useAllAttractions();
  const navigate = useNavigate();
  const handleSearchChange = () => {};
  const onSearchClick = () => {
    try {
      navigate("/search");
    } catch (error) {
      handleComponentError(error, "HomePage.onSearchClick");
    }
  };

  const attractionWithKeys = useMemo(() => {
    if (!allAttractions?.pages) return [];

    return allAttractions.pages.flatMap(
      (page) =>
        page?.items?.map((item) => ({
          ...item,
          uid: item?.id ?? nanoid(),
        })) || []
    );
  }, [allAttractions]);

  return (
    <ErrorBoundary>
      <div className="min-vh-100 bg-light container-fluid">
        <main className="pb-5">
          <div className="container-fluid p-0 position-relative">
            <div className="position-sticky z-1 top-0 bg-light">
              <Header />
              <h2 className="h4 fw-bold px-3 pt-3 pb-2 position-sticky z-1 top-0">
                Various Tourist Attractions
              </h2>
              <div onClick={onSearchClick}>
                <SearchBar
                  value=""
                  onChange={handleSearchChange}
                  placeholder="Search"
                />
              </div>
            </div>

            <div className="mt-4 container">
              {allAttractions && allAttractions.pages.length > 0 ? (
                <InfiniteScroll
                  dataLength={
                    allAttractions.pages?.flatMap((page) => page?.items || [])
                      .length || 0
                  }
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  loader={<CardSkeleton />}
                  endMessage={
                    <div className="item-center flex h-full max-h-screen">
                      <p className="text-center text-lg font-semibold">
                        All Caught Up
                      </p>
                    </div>
                  }
                >
                  {attractionWithKeys?.map((attraction) => (
                    <AttractionCard
                      key={attraction.uid}
                      attraction={attraction}
                    />
                  ))}
                </InfiniteScroll>
              ) : (
                <>
                  {[...Array(5)].map((_, index) => (
                    <CardSkeleton key={index} />
                  ))}
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default Home;
