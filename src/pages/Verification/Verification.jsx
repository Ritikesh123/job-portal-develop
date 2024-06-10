import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { verifyOtp } from "@/services/LoginService";
import { postVerification } from "@/services/OtherService";
import React, { useEffect, useState, useRef } from "react";
import OTPInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Verification = () => {
  const [otp, setOtp] = useState(undefined);
  const [otpMessage, setOtpMessage] = useState("");
  const [resendOtpTimer, setResendOtpTimer] = useState(30);
  const navigate = useNavigate();

  const { verifytype } = useParams();
  const login_token = JSON.parse(localStorage.getItem("login_token"));
  const sendOTP = async (endpoint) => {
    try {
      const otp = await postVerification(endpoint, {
        userId: login_token,
      });
      setResendOtpTimer(30);
      toast.success("OTP Sent");
    } catch (error) {
      toast.error("Error getting otp");
    }
  };

  const resetOtp = () => {
    sendOTP("candidate-email-otp");
    setOtp("");
    setOtpMessage("");
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
      setOtpMessage("");
      const otpResponse = await postVerification("candidate-verify-email-otp", {
        userId: login_token,
        otp: otp,
      });
      if (otpResponse.code == 200) {
        navigate(-1);
      } else {
        setOtpMessage(otpResponse?.message);
        setOtp("");
        toast.error(otpResponse?.message);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div className="px-5 h-[calc(100vh-64px)] flex flex-col justify-between pt-14 pb-11">
      <div>
        <div className="text-gray-900 text-2xl font-semibold leading-loose ">
          Verify your {verifytype === "email" ? "email" : "mobile"}
        </div>
        <div className=" mt-12 flex justify-between items-center">
          <div className=" flex flex-col gap-2">
            <div className=" text-gray-900 text-xs font-light leading-tight">
              Enter verification code sent on
            </div>
            <div className="   text-gray-900 text-base font-normal leading-7">
              {verifytype === "email"
                ? localStorage.getItem("email")
                : "+91 " + localStorage.getItem("mobileNumber")}
            </div>
          </div>
          {/* <div className="h-12 px-4 py-3   bg-white bg-opacity-0 rounded-md justify-center items-center gap-2.5 inline-flex">
        <Button
            onClick={handleNavigation}
            variant={"ghost"}
            className="text-slate-700 text-sm font-medium leading-normal px-1 py-1"
        >
            Change
        </Button>
        </div> */}
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
                00:{resendOtpTimer < 10 ? "0" + resendOtpTimer : resendOtpTimer}
              </div>
            ) : (
              <Button
                className="text-slate-700 text-sm font-medium leading-normal px-1 py-1"
                variant={"ghost"}
                onClick={() => resetOtp()}
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

export default Verification;
