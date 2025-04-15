import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
 
const Courses = () => {
  const {data, isLoading, isError} = useGetPublishedCourseQuery();
 
  if(isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
        <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
        <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
          Error Loading Courses
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Sorry, we couldn't load the courses. Please try again later.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  const isEmpty = !isLoading && (!data?.courses || data.courses.length === 0);

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : isEmpty ? (
            <div className="col-span-full flex flex-col items-center justify-center min-h-[50vh] p-6">
              <AlertCircle className="text-yellow-500 h-16 w-16 mb-4" />
              <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
                No Courses Available
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                There are no published courses at the moment.
              </p>
              <Link to="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          ) : (
            data.courses.map((course) => <Course key={course._id} course={course}/>) 
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
