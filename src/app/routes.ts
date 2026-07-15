import { createBrowserRouter } from "react-router";
import { SuperApp } from "./pages/SuperApp";
import { OTPVerification } from "./pages/OTPVerification";
import { Login } from "./pages/Login";
import { Chatbot } from "./pages/Chatbot";
import { SaraBalance } from "./pages/SaraBalance";
import { EligibleRetailers } from "./pages/EligibleRetailers";
import { DigitalLicense } from "./pages/DigitalLicense";
import { RoadTax } from "./pages/RoadTax";
import { SummonsCheck } from "./pages/SummonsCheck";
import { AppointmentBooking } from "./pages/AppointmentBooking";
import { SecurityPrivacy } from "./pages/SecurityPrivacy";
import { Feedback } from "./pages/Feedback";
import { DataSource } from "./pages/DataSource";

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
  {
    path: "/chatbot",
    Component: Chatbot,
  },
  {
    path: "/sara-balance",
    Component: SaraBalance,
  },
  {
    path: "/eligible-retailers",
    Component: EligibleRetailers,
  },
  {
    path: "/digital-license",
    Component: DigitalLicense,
  },
  {
    path: "/road-tax",
    Component: RoadTax,
  },
  {
    path: "/summons-check",
    Component: SummonsCheck,
  },
  {
    path: "/appointment-booking",
    Component: AppointmentBooking,
  },
  {
    path: "/security-privacy",
    Component: SecurityPrivacy,
  },
  {
    path: "/feedback",
    Component: Feedback,
  },
  {
    path: "/data-source",
    Component: DataSource,
  },
]);