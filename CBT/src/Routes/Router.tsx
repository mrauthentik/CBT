import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../Components/Dashboard/Dashboard";
import SignInPage from "../Components/UserAuth/SignInPage";
import SignUpPage from "../Components/UserAuth/SignUpPage";
import ExamPage from "../Components/Dashboard/ExamPage";

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
        element: <SignInPage />
    },
    {
        path: "/signup",
        element: <SignUpPage />
    },
    {
        path: "/exampage:courseId",
        element: <ExamPage />
    }
]);
export default router