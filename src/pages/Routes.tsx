import { createBrowserRouter } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import MainLayout from "@/components/Layouts/MainLayout";
import VerifyMobile from "./Otp/Otp";
import UploadResumeOne from "./UploadResume/UploadResume";
import CreateProfile from "./CreateProfile/CreateProfile";
import JobMainPage from "./JobsMainPage/JobsMainPage";
import SearchJobs from "./SearchJobs";
import JobListing from "./JobListing/JobListing";
import ShowAllJobs from "./ShowAllJobs/ShowAllJobs";
import ProfileHome from "./ProfileHome/ProfileHome";
import Profile from "./ProfileHome/Components/Profile/Profile";
import Overview from "./ProfileHome/Components/Overview/Overview";
import Preferences from "./ProfileHome/Components/Preferences/Preferences";
import More from "./More/More";
import Receipt from "./Receipt/Receipt";
import Account from "./Account/Account";
import TermsnCondition from "./TermsnCondition/TermsnCondition";
import Notifications from "./Notifications/Notifications";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./TermsOfUse/TermsOfUse";
import Verification from "./Verification/Verification";
import FAQ from "./FAQ/FAQ";

const NotFound = () => {
  const location = useLocation();

  // Access the pathname from the location object
  const currentPath = location.pathname;

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The requested URL: {currentPath} was not found.</p>
      {/* You can add a link or any other content here */}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/verify-mobile",
        element: <VerifyMobile />,
      },
      {
        path: "/upload-resume",
        element: <UploadResumeOne />,
      },
      {
        path: "/create-profile",
        element: <CreateProfile />,
      },
      { path: "/jobs", element: <JobMainPage /> },
      { path: "/more", element: <More /> },
      { path: "/privacy_policy", element: <PrivacyPolicy /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/receipt", element: <Receipt /> },
      { path: "/account", element: <Account /> },
      { path: "/t&c", element: <TermsnCondition /> },
      { path: "/termsofuse", element: <TermsOfUse /> },
      { path: "/search-jobs", element: <SearchJobs /> },
      { path: "/showAll/:type/:jobId", element: <ShowAllJobs /> },
      { path: "/showAll/:type", element: <ShowAllJobs /> },
      { path: "/job/:id", element: <JobListing /> },
      { path: "/notifications", element: <Notifications /> },
      { path: "/verification/:verifytype", element: <Verification /> },
      {
        path: "/profile",
        element: <ProfileHome />,
        children: [
          {
            path: "/profile/add",
            element: <Profile />,
          },
          {
            path: "/profile/overview",
            element: <Overview />,
          },
          {
            path: "/profile/preferences",
            element: <Preferences />,
          },
        ],
      },
      {
        path: "/search",
        element: <Home />,
      },
      {
        path:"/not",
        element:<NotFound />,
      }
    ],
  },
]);

export default router;
