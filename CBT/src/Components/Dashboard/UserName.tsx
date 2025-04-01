import React from "react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const Initials = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #008080;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 1rem;
  color: #333;
`;

interface UserProps {
  className?: string;
}

const User: React.FC<UserProps> = ({ className }) => {
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFullName(user.displayName || "User");
        const nameParts = user.displayName?.split(" ") || ["User"];
        setFirstName(nameParts[0] || "");
        setLastName(
          nameParts.length > 1 ? nameParts[nameParts.length - 1] : ""
        );

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
    return () => unsubscribe();
  }, []);
  const getInitials = () => {
    return (
      (firstName ? firstName.charAt(0).toUpperCase() : "") +
      (lastName ? lastName.charAt(0).toUpperCase() : "")
    );
  };
  if (loading) {
    return <p>Loading</p>;
  }
  return (
    <div className={`user-name ${className || ""}`.trim()}>
      <Initials>{getInitials()} </Initials>
      <UserName> {fullName}</UserName>
    </div>
  );
};
export default User;
