import React from "react";
import unverified from "@/assets/img/icons/alert-triangle.svg";
import verified from "@/assets/img/icons/check-circle-2.svg";
import useGetAccountStatus from "./hooks/useGetAccountStatus";
import { useNavigate } from "react-router-dom";
import { postData, postVerification } from "@/services/OtherService";
import { toast } from "react-toastify";

function Account() {
  const login_token = JSON.parse(localStorage.getItem("login_token"));
  const { data } = useGetAccountStatus({
    userId: login_token,
  });
  const navigate = useNavigate();
  const sendOTP = async (endpoint, route) => {
    try {
      const otp = await postVerification(endpoint, {
        userId: login_token,
      });
      navigate(route);
    } catch (error) {
      toast.error("Error getting otp");
    }
  };
  return (
    <div className="p-4 ">
      <div className="h-[14rem] rounded-md border border-grey-400 overflow-hidden shadow flex flex-col p-4 bg-white">
        <div className="flex flex-col gap-7">
          {data?.email && (
            <div>
              <div className="flex justify-between items-center">
                <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal">
                  Email Address
                </div>
                <div
                  className="flex items-center cursor-pointer gap-1"
                  onClick={() => {
                    if (data?.emailStatus == "Non Verified") {
                      localStorage.setItem("email", data?.email);
                      sendOTP("candidate-email-otp", "/verification/email");
                    }
                  }}
                >
                  <div
                    className={`${
                      data?.emailStatus == "Non Verified"
                        ? "text-red-600"
                        : "text-lime-700"
                    }  text-sm font-medium font-['Lexend'] leading-none `}
                  >
                    {data?.emailStatus == "Non Verified" ? "Verify" : "Verfied"}
                  </div>
                  <img
                    src={
                      data?.emailStatus == "Non Verified"
                        ? unverified
                        : verified
                    }
                    alt="verification status"
                  />
                </div>
              </div>
              <div className="text-gray-500 text-sm font-medium font-['Lexend'] leading-normal">
                {data?.email ?? "-"}
              </div>
            </div>
          )}
          {data?.mobile && (
            <div>
              <div className="flex justify-between items-center">
                <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal">
                  Phone Number
                </div>
                <div
                  className="flex items-center cursor-pointer gap-1 "
                  onClick={() => {
                    if (data?.mobileStatus == "Non Verified") {
                      localStorage.setItem("mobile", data?.mobile);
                      navigate("/verification/mobile");
                    }
                  }}
                >
                  <div
                    className={`${
                      data?.mobileStatus == "Non Verified"
                        ? "text-red-600"
                        : "text-lime-700"
                    }  text-sm font-medium font-['Lexend'] leading-none `}
                  >
                    {data?.mobileStatus == "Non Verified"
                      ? "Verify"
                      : "Verfied"}
                  </div>
                  <img
                    src={
                      data?.mobileStatus == "Non Verified"
                        ? unverified
                        : verified
                    }
                    alt="verification status"
                  />
                </div>
              </div>
              <div className="text-gray-500 text-sm font-medium font-['Lexend'] leading-normal">
                {data?.mobile ? "+91" + data?.mobile : "-"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
