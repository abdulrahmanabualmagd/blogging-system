import {
    HomePage,
    CreatePostPage,
    EmailVerificationPage,
    LoginPage,
    ManagePostPage,
    PasswordResetPage,
    RegisterPage,
    TimelinePage,
} from "pages";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/create-post",
        element: <CreatePostPage />,
    },
    {
        path: "/email-verification",
        element: <EmailVerificationPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/manage-post",
        element: <ManagePostPage />,
    },
    {
        path: "/password-reset",
        element: <PasswordResetPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/timeline",
        element: <TimelinePage />,
    },
]);

export default router;
