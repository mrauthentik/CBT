<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase'; // Ensure auth is exported from your firebase config
import SideBar from '../SideBar';
import { GoogleGenerativeAI } from '@google/generative-ai';

const UserInfo = () => {
  const [userData, setUserData] = useState({ firstName: '', lastName: '' });

  // Generative AI initialization
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('API key is not defined');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Get the current user
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid, 'settings', 'profile');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
            });
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  // const fetchAIResponse = async () => {
  //   if (userInput.trim()) {
  //     try {
  //       const result = await model.generateContent(userInput);
  //       setAiResponse(result.response.text());
  //     } catch (error) {
  //       console.error('AI Error:', error);
  //     }
  //   }
  // };

  return (
    <div className="user-info">
      <SideBar />
      <div className="user-info-container">
        <h3>Name: {userData.firstName} {userData.lastName}</h3>
        <h3>Email: {auth.currentUser?.email || ''}</h3>
        
=======
import SideBar from '../SideBar'

const UserInfo = () => {
  return (
    <div className='user-info'>
        <SideBar />
      <div className='user-info-container'>
        <h3>Name:</h3>
        <h3>Email:</h3>
        <h3>Department</h3>
>>>>>>> b1c153a33c12c41922080283c55099a15b203d2c
      </div>
    </div>
  );
};

export default UserInfo;