import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import SideBar from "../SideBar";
import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProgressChart from "./UserProgressChart";
import User from "./UserName";
import { ThreeDots } from "react-loader-spinner";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #d1fae5);
  padding: 1rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  tetx-align: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const Content = styled.main`
  flex: 1;
  padding: 2rem 0;
  overflow-y: auto;
  transition: margin-left 0.3s ease-in-out;

  @media (min-width: 1024px) {
    padding-left: 16rem;
  }

  @media (max-width: 1024px) {
    padding-left: 10rem;
  }

  @media (max-width: 768px) {
    padding-left: 3rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2.2rem;
  font-weight: 700;
`;

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const ScoreTable = styled.div`
  overflow-x: auto;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const TableHeader = styled.th`
  background: #008080;
  color: white;
  padding: 12px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-of-type(even) {
    background: #f3f4f6;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Dashboard: React.FC = () => {
  const [fullName, setFullName] = useState<string>("User");
  const [loading, setLoading] = useState<boolean>(true);
  const [progressData, setProgressData] = useState<
    { date: string; score: number; courseId: string }[]
  >([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setFullName(user.displayName || "User");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const progressRef = collection(db, `users/${userId}/progress`);
    const unsubscribe = onSnapshot(progressRef, (snapshot) => {
      const data = snapshot.docs
        .map(
          (doc) => doc.data() as { date: string; score: number; course: string }
        )
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      setProgressData(data);
      console.log("Fetched Progress Data are: ", data);
    });
    return () => unsubscribe();
  }, [userId]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌻 Good Morning';
    if (hour <= 15) return '🌤️ Good Afternoon';
    return '🌙 Good Evening';
  };

  if (loading) {
    return (
      <Container>
        <ThreeDots color="#3B82F6" height={50} width={80} />
      </Container>
    );
  }

  return (
    <Container>
      <SideBar />
      <Content>
        <Header>
          <h2 className="text-center px-3 py-3 font-bold ">
             {getGreeting()} {fullName} 
          </h2>
          <User className="hide-username-on-mobile" />
        </Header>
        <ToastContainer />
        <Title>User Progress</Title>
        <ChartContainer>
          <UserProgressChart data={progressData} />
        </ChartContainer>
        <ScoreTable>
          <Table>
            <thead>
              <tr>
                <TableHeader>S/N</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Course</TableHeader>
                <TableHeader>Score</TableHeader>
              </tr>
            </thead>
            <tbody>
              {progressData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.courseId ?? "N/A"}</TableCell>
                  <TableCell>{entry.score}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </ScoreTable>
      </Content>
    </Container>
  );
};

export default Dashboard;
