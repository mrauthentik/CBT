import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import SideBar from "../SideBar";
import styled from '@emotion/styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProgressChart from "./UserProgressChart";
import User from "./UserName";
import { ThreeDots } from 'react-loader-spinner';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff, #008080);
  background-size: 200% 200%;
  animation: gradientAnimation 10s ease infinite;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.7);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  margin-left: 250px;
  transition: margin-left 0.3s ease-in-out;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
`;

const Welcome = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const Dashboard: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<{ date: string; score: number; }[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFullName(user.displayName || "User");
        const nameParts = user.displayName?.split(" ") || ["User"];
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.length > 1 ? nameParts[nameParts.length - 1] : "");

        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            // const userData = userDoc.data();
          } else {
            console.error("User document does not exist in Firestore!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("No authenticated user found!");
      }
      setLoading(false);
    });

    const fetchProgressData = async () => {
      const userId = fullName;
      const querySnapshot = await getDocs(collection(db, `users/${userId}/progress`));

      const data = querySnapshot.docs.map((doc) => ({
        date: doc.data().date,
        score: doc.data().score,
      }));
      setProgressData(data);
    };
    fetchProgressData();

    return () => unsubscribe();
  }, [fullName]); // Added fullName as a dependency.

  if (loading) {
    return (
      <LoadingContainer>
        <ThreeDots
          color="#3B82F6"
          height={80}
          width={80}
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <SideBar />
      <Content>
        <Header>
          <UserInfo>
            <User />
          </UserInfo>
        </Header>
        <ToastContainer />
        <Title>Dashboard</Title>
        <Welcome>Hello 👋, {fullName || "User"}!</Welcome>
        <h2>User Progress</h2>
        <UserProgressChart data={progressData} />
      </Content>
    </Container>
  );
};

export default Dashboard;