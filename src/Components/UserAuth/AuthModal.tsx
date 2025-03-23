import { useState } from 'react';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import styled from "@emotion/styled"

const ModalBackground = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.5);
  display:flex;
  justify-content:center;
  align-items:center;
`

const AuthModal: React.FC = ()=>{
     const [isSignIn, setIsSignIn] = useState(true)
     
     const toggleAuth = ()=>{
        setIsSignIn((prev) => !prev)
     }

     return (
        <ModalBackground>
            {isSignIn ? (
                <SignInPage toggleAuth= {toggleAuth} />
            ):(
                <SignUpPage toggleAuth = {toggleAuth} />
            )}

        </ModalBackground>
     )
}

export default AuthModal