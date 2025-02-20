import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../Components/Dashboard/Dashboard";
import SignInPage from "../Components/UserAuth/SignInPage";
import SignUpPage from "../Components/UserAuth/SignUpPage";
import ExamPage from "../Components/Dashboard/ExamPage";
import ForgetPsw from "../Components/UserAuth/ForgetPsw";
import Courses from "../Components/Dashboard/Courses";
import UserInfo from "../Components/Dashboard/UserInfo";
import Settings from "../Components/Dashboard/Settings";
import AdminLogin from "../Components/Admin/AdminLogin";
import AdminDashboard from "../Components/Admin/AdminDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: "/signin",
        element: <SignInPage  toggleAuth={()=>{}}/>
    },
    {
        path: "/signup",
        element: <SignUpPage toggleAuth={() => { /* your toggleAuth function implementation */ }} />
    },
    {
        path: "/exampage/:courseId",
        element: <ExamPage />
    },
    {
        path:'/courses',
        element:  <Courses />
    },
    {
        path: "/forgetpsw",
        element: <ForgetPsw />
    },
    {
        path: "/userinfo",
        element: <UserInfo />
    },
    {
        path: "/settings",
        element: <Settings />
    },
    {
        path: "/admin-login",
        element: <AdminLogin />
    },
    {
        path: "/admin",
        element: <AdminDashboard />
    },
    
]);
export default router