import React, {useEffect, useState} from "react"
import {collection, getDocs} from "firebase/firestore"
import {db} from '../firebase'
import { useNavigate } from "react-router-dom";

const CourseSelection: React.FC = () =>{
    const [courses,setCourses] = useState<{ id:string; CourseName:string; CourseCode:string;}[]>(
        []
    );
    const [searchTerm, setSearchTerm] = useState("")

   const navigate = useNavigate ()
   const handleCourseSelect = (courseId:string)=>{
      navigate(`/exampage/${courseId}`)
      
   }
    useEffect(() => {
        const fetchCourses = async()=>{
            
            try{
                const coursesCollection = collection(db, "courses");
                const courseSnapshot = await getDocs(coursesCollection);
                const courseList = courseSnapshot.docs.map((docs)=> ({
                    id: docs.id,
                    ...docs.data(),
                    CourseName: docs.data().CourseName,
                    CourseCode: docs.data().CourseCode
                })) as { id:string; CourseName: string; CourseCode: string;} [];
                setCourses(courseList)
               
            }catch (err){
                console.error("Error fectching courses",err)
            }
        };
        fetchCourses();
    }, [])

    //Search and filter Functionality
    const filteredCourses = courses.filter(course =>
        course.CourseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.CourseCode.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="courses px-4 sm:px-6 md:px-8 py-6">
  <div className="course-container max-w-4xl mx-auto">
    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">SELECT A COURSE</h2>

    <fieldset className="space-y-4">
      <input
        type="text"
        placeholder="Search courses by name or course code.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md p-2 w-full"
      />

      <ul className="space-y-2">
        {filteredCourses.length === 0 && <p>No courses found</p>}

        {filteredCourses.map((course, index) => {
         
          return (
            <li
              key={course.id || index}
              onClick={() => handleCourseSelect(course.id)}
              title="Click to take Exam"
              className="cursor-pointer hover:bg-teal-100 p-3 rounded-md flex items-center justify-between flex-wrap text-sm sm:text-base border border-gray-200"
            >
              <span className="mr-2 font-semibold course-numbering">{index + 1}.</span>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span>{course.CourseName}</span>
                <span className="text-gray-500">{course.CourseCode}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </fieldset>
  </div>
</div>

    )
}

export default CourseSelection