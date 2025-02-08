import React, {useEffect, useState} from "react"
import {collection, getDocs} from "firebase/firestore"
import {db} from '../firebase'

const CourseSelection: React.FC = () =>{
    const [courses,setCourses] = useState<{ id:string; courseName:string;}[]>(
        []
    );


    useEffect(() => {
        const fetchCourses = async()=>{
            try{
                const coursesCollection = collection(db, "courses");
                const courseSnapshot = await getDocs(coursesCollection);
                const courseList = courseSnapshot.docs.map((docs)=> ({
                    id: docs.id,
                    ...docs.data(),
                })) as { id:string; courseName: string;} [];
                setCourses(courseList)
            }catch (err){
                console.log("Error fectching courses",err)
            }
        };
        fetchCourses();
    }, [])

    return (
        <div>
            <h2>Select a Course</h2>
            <ul>
                {courses.map((course) => {
                    return( 
                    <li key={course.id}>{course.courseName}</li>
                   
                );
                })}
                {courses.map((course)=>{
                    return <li key={course.id}>{course.courseName}</li>
                })}
            </ul>
        </div>
    )
}

export default CourseSelection