import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { DashboardV2 } from "./pages/DashboardV2";
import { SuperApp } from "./pages/SuperApp";
import { OTPVerification } from "./pages/OTPVerification";
import { Login } from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/super-app",
    Component: SuperApp,
  },
  {
    path: "/otp",
    Component: OTPVerification,
  },
]);