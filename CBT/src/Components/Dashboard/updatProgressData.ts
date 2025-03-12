import { db, auth } from "../firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

// Update progress data for a specific date
export const updateProgressData = async (date: string, newScore: number) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No authenticated user found!");
    }

    const progressRef = collection(db, `users/${user.uid}/progress`);
    const q = query(progressRef, where("date", "==", date));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No progress entry found for this date!");
    }

    const docRef = doc(db, `users/${user.uid}/progress`, querySnapshot.docs[0].id);
    await updateDoc(docRef, {
      score: newScore,
      updatedAt: new Date().toISOString(), // Optional: for auditing
    });
    console.log("Progress data updated successfully!");
  } catch (error) {
    console.error("Error updating progress data:", error);
    throw error;
  }
};