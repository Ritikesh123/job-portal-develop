import Openhire from "../Icons/Openhire";
import { Menu } from "lucide-react";
import { Button } from "../common/ui/button";
import { memo, useState } from "react";
import { Card, CardContent } from "../common/ui/card";
import Content from "../Content/Content";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Back from "@/assets/img/icons/back.svg";
import companyLogo from "@/assets/img/icons/mainLogo.png";
const Header = ({ routeToGoBack, showShare }) => {
  const fadeInVariant = {
    opened: {
      opacity: 1,
      transition: {
        delay: 0.4,
      },
    },
    closed: { opacity: 0 },
  };

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const login_token = JSON.parse(localStorage.getItem("login_token"));
  const navigate = useNavigate();
  const location = useLocation();
  const { id: jobID, type, verifytype } = useParams();
  const loggedInUser = () => {
    setMobileNavOpen((prev) => !prev);
    localStorage.clear();
  };
  const signUpUser = () => {
    setMobileNavOpen((prev) => !prev);
  };
  const hideMenu = [
    "/job/" + jobID,
    "/showAll/" + type,
    "/more",
    "/account",
    "/receipt",
    "/t&c",
    "/faq",
    "/notifications",
    "/search-jobs",
    "/privacy_policy",
    "/termsofuse",
    "/verification/" + verifytype,
  ];
  return (
    <>
      <nav
        className="bg-white flex justify-center items-center w-full mb-1 sticky top-0"
        style={{ zIndex: 10000 }}
      >
        <Card className="relative mx-auto w-full h-16 md:max-w-md rounded-none">
          <CardContent>
            <div className=" ">
              <div className="absolute left-4  -translate-y-1/2 top-1/2 h-8 w-8">
                {hideMenu?.includes(location?.pathname) ? (
                  <Button
                    variant={"ghost"}
                    className="py-0 px-0 h-full w-full"
                    onClick={() => navigate(-1)}
                  >
                    <img src={Back} />
                  </Button>
                ) : (
                  <Button
                    variant={"ghost"}
                    className="py-0 px-0 h-full w-full"
                    onClick={() => setMobileNavOpen((prev) => !prev)}
                  >
                    <Menu
                      className={cn(
                        "text-gray-900",
                        mobileNavOpen ? "text-slate-700" : ""
                      )}
                    />
                  </Button>
                )}
              </div>
              <div
                className="w-40 md:w-1/4 h-8 absolute left-1/2 transform -translate-x-1/2 top-4 flex items-center justify-center cursor-pointer"
                onClick={() =>
                  login_token ? navigate("/jobs") : navigate("/")
                }
              >
                <img src={companyLogo} alt="deijobs logo" />
              </div>
            </div>
          </CardContent>
        </Card>
      </nav>
      <AnimatePresence>
        {mobileNavOpen ? (
          <motion.div
            variants={fadeInVariant}
            className="bg-white min-w-full min-h-[100vh] sticky top-[64px]"
            style={{
              zIndex: 9999,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Content
              onClick={
                JSON.parse(localStorage.getItem("login_token"))
                  ? loggedInUser
                  : signUpUser
              }
            ></Content>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);
