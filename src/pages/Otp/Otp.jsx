import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { verifyOtp } from "@/services/LoginService";
import React, { useEffect, useState, useRef } from "react";
import { sendOtp } from "@/services/LoginService";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { toast } from "react-toastify";
const VerifyMobile = () => {
  const [otp, setOtp] = useState(undefined);
  const [otpMessage, setOtpMessage] = useState("");
  const [resendOtpTimer, setResendOtpTimer] = useState(30);
  const [loggedIn, setLoggedIn] = useLocalStorage("login_token", undefined);
  const prevMax = useRef(30);
  const navigate = useNavigate();

  const resetOtp = async () => {
    const mobileNumber = localStorage.getItem("mobileNumber");
    setOtpMessage("");
    setOtp(undefined);
    const otpResponse = await sendOtp(mobileNumber);

    toast.success(otpResponse?.message);
    setResendOtpTimer(prevMax.current * 2);
    prevMax.current *= 2;
  };

  useEffect(() => {
    const timerRef = setInterval(() => {
      setResendOtpTimer((state) => (state > 0 ? state - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(timerRef);
    };
  }, []);

  const verifyOtpHandler = async () => {
    try {
      const mobileNumber = localStorage.getItem("mobileNumber");
      setOtpMessage("");
      const otpResponse = await verifyOtp(mobileNumber, otp);

      // Handle the response here (e.g., show a success message)
      // alert(otpResponse.message);

      if (otpResponse.code == 200) {

        setLoggedIn(otpResponse?.login_token);
        // localStorage.setItem("login_token", otpResponse?.login_token);
        localStorage.setItem("userId", otpResponse?.userId);
        // navigate("/upload-resume");

        const studentResumeExists = otpResponse?.studentResumeExist;
        const studentProfileExist = otpResponse?.studentProfileExist;

        if (studentResumeExists) {
          navigate("/create-profile");
        }
        if (studentProfileExist) {
          navigate("/jobs");
        } else {
          navigate("/upload-resume");
        }
      } else {
        setOtpMessage(otpResponse.message);
        toast.error(otpResponse?.message);
      }

      // Redirect to the verification page after OTP is sent successfully
      // navigate("/verify-mobile");
    } catch (error) {
      // Handle the error here (e.g., display an error message)
      console.error("Error sending OTP:", error);
    }
  };

  const handleNavigation = () => {
    navigate("/login");
  };

  return (
    <div className="px-5 h-[calc(100vh-64px)] flex flex-col justify-between pt-14 pb-11">
      <div>
        <div className="text-gray-900 text-2xl font-semibold leading-loose ">
          Verify your mobile
        </div>
        <div className=" mt-12 flex justify-between items-center">
          <div className=" flex flex-col gap-2">
            <div className=" text-gray-900 text-xs font-light leading-tight">
              Enter verification code sent on
            </div>
            <div className="   text-gray-900 text-base font-normal leading-7">
              +91 {localStorage.getItem("mobileNumber")}
            </div>
          </div>
          <div className="h-12 px-4 py-3   bg-white bg-opacity-0 rounded-md justify-center items-center gap-2.5 inline-flex">
            <Button
              onClick={handleNavigation}
              variant={"ghost"}
              className="text-slate-700 text-sm font-medium leading-normal px-1 py-1"
            >
              Change
            </Button>
          </div>
        </div>

        <OTPInput
          value={otp}
          onChange={setOtp}
          containerStyle={{
            display: "flex",
            gap: 14,
            marginTop: 42,
            marginBottom: 42,

            justifyContent: "space-between",
          }}
          numInputs={6}
          renderInput={(props) => (
            <Input
              {...props}
              placeholder="•"
              className="h-[38px] w-[42px] shrink-0 text-center"
              style={{}}
            />
          )}
        />
        {otpMessage && (
          <div className="text-red-600 text-sm font-light">{otpMessage}</div>
        )}
        <div className="flex justify-between items-center">
          <div className="   text-gray-900 text-base font-normal leading-7">
            Haven’t received code?
          </div>
          <div className=" px-4 py-3   bg-white bg-opacity-0 rounded-md justify-center items-center gap-2.5 inline-flex">
            {resendOtpTimer !== 0 ? (
              <div className="text-gray-500 text-sm font-medium leading-normal">
                00:{resendOtpTimer}
              </div>
            ) : (
              <Button
                className="text-slate-700 text-sm font-medium leading-normal px-1 py-1"
                variant={"ghost"}
                onClick={resetOtp}
              >
                Resend Otp
              </Button>
            )}
          </div>
        </div>
      </div>
      <Button
        onClick={verifyOtpHandler}
        disabled={String(otp).length !== 6}
        className="w-full"
      >
        Verify
      </Button>
    </div>
  );
};

export default VerifyMobile;
