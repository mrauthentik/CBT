import React, { useState, useEffect } from "react";
import CourseSelection from "./CourseSelection";
import SideBar from "../SideBar";
import { ThreeDots } from "react-loader-spinner";


const Courses = () => {
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  // Simulate loading (replace with actual data fetching logic if needed)
  useEffect(() => {
    // Example: Simulate a delay or fetch data here
    const fetchData = async () => {
      try {
        // Add your data fetching logic here if CourseSelection relies on data
        // For now, we'll just simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched or delay ends
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <ThreeDots
          color="#3B82F6"
          height={80}
          width={80}
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="courses-container">
      <SideBar />
      <CourseSelection />
    </div>
  );
};

export default Courses;