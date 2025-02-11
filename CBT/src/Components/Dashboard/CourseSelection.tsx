import React, {useEffect, useState} from "react"
import {collection, getDocs} from "firebase/firestore"
import {db} from '../firebase'
import { useNavigate } from "react-router-dom";

const CourseSelection: React.FC = () =>{
    const [courses,setCourses] = useState<{ id:string; CourseName:string;}[]>(
        []
    );

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
                    CourseName: docs.data().CourseName
                })) as { id:string; CourseName: string;} [];
                setCourses(courseList)
                console.log("Course List",courseList)
            }catch (err){
                console.log("Error fectching courses",err)
            }
        };
        fetchCourses();
    }, [])

    return (
        <div className="courses">
            <h2>Select a Course</h2>
            <ul>
                {courses.length == 0 && <p> No courses found</p>}
                {courses.map((course, index) => {
                    console.log("Rendering:", course.CourseName)
                    return( 
                    <li key={course.id|| index}  onClick={()=> handleCourseSelect(course.id)}> 
                    
                    {course.CourseName}
                      {/* <button onClick={()=> handleCourseSelect(course.id)}> Start</button> */}
                     </li>
                  
                );
                })}
               
            </ul>
            {/* <button type="submit" onClick={handleCourseSelect} >Start Exam</button> */}
        </div>
    )
}

export default CourseSelection