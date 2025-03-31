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
      console.log(`${courseId} has been clicked`)
   }
    useEffect(() => {
        const fetchCourses = async()=>{
            console.log("Courses state updated", courses)
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
                console.log("Course List",courseList)
            }catch (err){
                console.log("Error fectching courses",err)
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
        <div className="courses">
            <div className="course-container">

            <h2>SELECT A COURSE</h2>
            <fieldset>
                <input 
                    type="text" 
                    placeholder="Search courses by name or course code.."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-md p-2 w-full"
                />

            <ul>
                
                {filteredCourses.length == 0 && <p> No courses found</p>}
                {filteredCourses.map((course, index) => {
                    console.log("Rendering:", course.CourseName)
                    return( 
                    <li title="Click to take Exam" key={course.id|| index}  onClick={()=> handleCourseSelect(course.id)}> 
                    
                    {course.CourseName} <span>{course.CourseCode}</span> 
                      {/* <button onClick={()=> handleCourseSelect(course.id)}> Start</button> */}
                     </li>
                  
                );
            })}
               
            </ul>
            {/* <button type="submit" onClick={handleCourseSelect} >Start Exam</button> */}
            </fieldset>
            </div>
        </div>
    )
}

export default CourseSelection