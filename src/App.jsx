import { RouterProvider } from "react-router-dom";
import routes from "./pages/Routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./query/client";
import { UserProvider } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ReactGA from "react-ga";
// const TRACKING_ID = "G-RSLCET88S7"; // YOUR_OWN_TRACKING_ID
// ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={routes} />
      </UserProvider>
      <ToastContainer
        style={{ zIndex: "11000", top: "4rem" }}
        autoClose={2000}
      />
    </QueryClientProvider>
  );
}

export default App;
