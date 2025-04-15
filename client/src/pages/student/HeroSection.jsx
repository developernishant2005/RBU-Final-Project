import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white py-24 px-4 text-center overflow-hidden"
    >
      {/* Glow Background */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-[200px] opacity-50 top-0 left-1/2 -translate-x-1/2 -z-10" />
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
        >
          Unlock Your Learning Potential
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-gray-300 dark:text-gray-400 mb-8 text-lg"
        >
          Explore cutting-edge courses tailored to your interests and career goals.
        </motion.p>

        {/* Search Form */}
        <motion.form
          onSubmit={searchHandler}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Discover Your Next Course"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800"
          >
            Search
          </Button>
        </motion.form>

        {/* Explore Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={() => navigate("/course/search")}
            className="bg-white dark:bg-gray-800 text-blue-600 font-medium px-6 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            Explore All Courses
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
