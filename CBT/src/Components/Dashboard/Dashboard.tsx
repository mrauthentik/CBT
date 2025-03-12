import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
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

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 1rem 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

interface ProgressData {
  date: string;
  score: number;
}

const Dashboard: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [progressLoading, setProgressLoading] = useState<boolean>(false);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        setFullName(user.displayName || "User");
        const nameParts = user.displayName?.split(" ") || ["User"];
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.length > 1 ? nameParts[nameParts.length - 1] : "");
      } else {
        setError("Please log in to view your dashboard.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time listener for progress data
  useEffect(() => {
    if (!userId) return;

    setProgressLoading(true);
    const progressRef = collection(db, `users/${userId}/progress`);

    const unsubscribe = onSnapshot(
      progressRef,
      (snapshot) => {
        const data: ProgressData[] = snapshot.docs
          .map((doc) => ({
            date: doc.data().date,
            score: doc.data().score,
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setProgressData(data);
        setProgressLoading(false);
      },
      (err) => {
        console.error("Error fetching progress data:", err);
        setError("Failed to load progress data.");
        setProgressLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

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
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {progressLoading ? (
          <LoadingContainer>
            <ThreeDots
              color="#3B82F6"
              height={50}
              width={50}
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </LoadingContainer>
        ) : progressData.length > 0 ? (
          <UserProgressChart data={progressData} />
        ) : (
          <p>No progress data available.</p>
        )}
      </Content>
    </Container>
  );
};

export default Dashboard;