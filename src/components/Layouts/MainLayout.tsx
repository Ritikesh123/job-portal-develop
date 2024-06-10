import {
  Navigate,
  Outlet,
  redirect,
  useLocation,
  useOutlet,
  useParams,
} from "react-router-dom";
import Header from "../Header/Header";
import { useEffect } from "react";
import { cn } from "@/utils/utils";
import { useLocalStorage } from "usehooks-ts";
import BottomNavBar from "@/pages/JobsMainPage/BottomNavBar";
import ScrollToTop from "../ScrollTop/ScrollTop";
import "./MainLayout.css";

const MainLayout = () => {
  const outletComponent = useOutlet();
  const location = useLocation();
  const { id: jobID, verifytype } = useParams();

  const [loggedIn, setLoggedIn] = useLocalStorage("login_token", undefined);
  const hideFooter = [
    "/upload-resume",
    "/create-profile",
    "/job/" + jobID,
    "/account",
    "/receipt",
    "/t&c",
    "/faq",
    "/notifications",
    "/privacy_policy",
    "/termsofuse",
    "/verification/" + verifytype,
  ];

  const layoutProps =
    outletComponent?.props?.children?.props?.children?.type.layoutProps || {};

  const { headerProps = {}, pageClassName = "" } = layoutProps;
  if (layoutProps.requiredAuth && !loggedIn) {
    if (location.pathname !== "/search-jobs") {
      return <Navigate to="/login" />;
    }
  }

  return (
    // <div
    //   className={cn(
    //     `md:max-w-md mx-auto w-full bg-gray-50 min-h-screen relative flex flex-col`,
    //     pageClassName
    //   )}
    // >
    <div
      className={cn(
        `md:max-w-md mx-auto w-full bg-gray-50 relative flex flex-col min-h-[100vh]`,
        pageClassName
      )}
    >
      <Header {...headerProps} />
      <ScrollToTop />
      <div className="flex-grow content">
        <Outlet />
      </div>
      {!hideFooter?.includes(location.pathname) &&
        localStorage.getItem("login_token") && <BottomNavBar />}
    </div>
  );
};

export default MainLayout;
