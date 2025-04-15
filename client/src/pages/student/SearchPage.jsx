import { useState, useEffect } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "../../components/ui/skeleton";
import { useGetSearchCourseQuery } from "../../features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading, isError } = useGetSearchCourseQuery({
    searchQuery: query || "",
    categories: selectedCategories,
    sortByPrice
  });

  const isEmpty = !isLoading && (!data?.courses || data.courses.length === 0);

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  // Reset filters when search query changes
  useEffect(() => {
    if (query) {
      setSelectedCategories([]);
      setSortByPrice("");
    }
  }, [query]);

  if(isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
        <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
          Error Searching Courses
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Sorry, we couldn't search for courses. Please try again later.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">
          {query ? `Results for "${query}"` : "All Courses"}
        </h1>
        {query && (
          <p>
            Showing results for{""}
            <span className="text-blue-800 font-bold italic">{query}</span>
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <Filter handleFilterChange={handleFilterChange}/>
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
              <AlertCircle className="text-yellow-500 h-16 w-16 mb-4" />
              <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
                No Courses Found
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                We couldn't find any courses matching your search criteria.
              </p>
              <Link to="/">
                <Button variant="outline">Browse All Courses</Button>
              </Link>
            </div>
          ) : (
            data.courses.map((course) => <SearchResult key={course._id} course={course}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-4">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-20 mt-2" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
};
