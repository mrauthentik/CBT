import {db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// Add progress data for the authenticated user
export const addProgressData = async (date: string, score: number) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No authenticated user found!");
      console.log('No authenticated user found!')
    }

    const progressRef = collection(db, `users/${user.uid}/progress`);
    await addDoc(progressRef, {
      date,
      score,
      createdAt: new Date().toISOString(), // Optional: for sorting or auditing
    });
    console.log("Progress data added successfully!");
    
  } catch (error) {
    console.error("Error adding progress data:", error);
    throw error;
  }
};