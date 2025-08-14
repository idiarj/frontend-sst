import { createBrowserRouter, Navigate } from "react-router-dom";
//import { achetetepese } from "../utils/fetch";
import AppLayout from "../layout/AppLayout";
import Login from "../views/auth/login";
import VerifyIdCard from "../views/auth/VerifyIdCard";
import Register from "../views/auth/Register";
import RecoverPassword from "../views/auth/recoverPassword";
import NewPassword from "../views/auth/newPassword";
import Devices from "../views/admin/devices";
import Reports from "../views/admin/reports";
import Plans from "../views/admin/plans";
import Payments from "../views/admin/payments";
import Settings from "../views/admin/settings";
import SendReport from "../views/user/sendReport";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
        { path: '/login', element: <Login /> },
        { path: '/verify-id', element: <VerifyIdCard /> },
        { path: '/register', element: <Register /> },
        { path: '/recoverpassword', element: <RecoverPassword /> },
        { path: '/newpassword', element: <NewPassword /> },
        { path: '/admin/devices', element: <Devices /> },
        { path: '/admin/reports', element: <Reports /> },
        { path: '/plans', element: <Plans /> },
        { path: '/payments', element: <Payments /> },
        { path: '/settings', element: <Settings /> },
        { 
            path: '/user/sendreport', 
            element: <SendReport />,
            loader: async ()=>{
                
            }
             },
        { path: '/', element: <Navigate to="/login" replace /> },
        ]
    },
    // {
    //     path: '*',
    //     element: <Navigate to="/login" replace />
    // }
])