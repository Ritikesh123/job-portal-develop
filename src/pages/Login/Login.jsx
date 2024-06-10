import { Button } from "@/components/common/ui/button";
import { Checkbox } from "@/components/common/ui/checkbox";
import { Input } from "@/components/common/ui/input";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ReactComponent as GoogleIcon } from "../../assets/img/icons/google-color-icon.svg";
import { Linkedin } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { sendOtp } from "@/services/LoginService";
import { useLocalStorage } from "usehooks-ts";
const schema = yup
  .object({
    mobileNumber: yup
      .string()
      .matches(
        /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
        "Phone number is not valid"
      ),
    agreedToTerms: yup
      .boolean()
      .oneOf([true], "Terms and conditions must be checked"),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useLocalStorage("login_token", undefined);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Access individual query parameters
  const user_id = queryParams.get("login_token");
  const login_token = queryParams.get("login_token");
  const studentResumeExists = queryParams.get("studentResumeExist");
  const studentProfileExist = queryParams.get("studentProfileExist");

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/jobs");
    }

    if (user_id && login_token) {
      setLoggedIn(JSON.stringify(login_token));

      localStorage.setItem("userId", JSON.stringify(login_token));
      localStorage.setItem("login_token", JSON.stringify(login_token));
      localStorage.setItem("studentResumeExists", studentResumeExists);
      localStorage.setItem("studentProfileExist", studentProfileExist);

      if (studentResumeExists) {
        navigate("/create-profile");
      }
      if (studentProfileExist) {
        navigate("/jobs");
      } else {
        navigate("/upload-resume");
      }

      // if (studentResumeExists) {
      //   navigate("/create-profile");
      // } else {
      //   navigate("/upload-resume");
      // }
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      agreedToTerms: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const mobileNumber = data.mobileNumber;
      const otpResponse = await sendOtp(mobileNumber);

      localStorage.setItem("mobileNumber", mobileNumber);

      // Handle the response here (e.g., show a success message)

      // Redirect to the verification page after OTP is sent successfully
      navigate("/verify-mobile");
    } catch (error) {
      // Handle the error here (e.g., display an error message)
      console.error("Error sending OTP:", error);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to the /google-login route
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${BASE_URL}/google-login`;
  };

  return (
    <div className="w-full relative flex flex-col bg-white px-5 py-6">
      <form
        className="w-full relative flex flex-col bg-white px-5 py-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full   text-black text-2xl font-semibold leading-8">
          Portal to connect D&I Job
          <br />
          Seekers with Diversity
          <br />
          Hiring Organisations
        </div>
        <div className=" mt-10 flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="text-slate-900 text-sm font-medium leading-normal">
            Mobile Number
          </div>
          <div className="w-full">
            <div className="self-stretch gap-2 p-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
              <div className="text-gray-400 text-base font-normal leading-normal border-none">
                +91{" "}
              </div>
              <Input
                {...register("mobileNumber")}
                placeholder="Enter your mobile number"
                className=" w-full text-black-400  text-base font-normal leading-normal border-none focus:border-none"
              />
            </div>
            <p className="text-red-600 text-sm font-light my-1">
              {" "}
              {errors["mobileNumber"]?.message}
            </p>
          </div>
        </div>
        <div className="flex gap-3 mb-3 mt-9">
          <Controller
            name="agreedToTerms"
            control={control}
            render={({ field }) => (
              <Checkbox
                className="mt-1"
                checked={field.value}
                onCheckedChange={field.onChange}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          ></Controller>

          <div className="">
            <span className="text-gray-900 text-[11px] font-light leading-tight">
              By continuing you agree to have read and accept the{" "}
            </span>
            <span
              className="text-slate-700 text-[11px] font-medium leading-tight cursor-pointer"
              onClick={() => navigate("/t&c")}
            >
              Terms & Conditions
            </span>
            <span className="text-zinc-500 text-[11px] font-light leading-tight">
              {" "}
            </span>
            <span className="text-gray-900 text-[11px] font-light leading-tight">
              and
            </span>
            <span className="text-zinc-500 text-[11px] font-light leading-tight">
              {" "}
            </span>
            <span
              className="text-slate-700 text-[11px] font-medium leading-tight cursor-pointer"
              onClick={() => navigate("/privacy_policy")}
            >
              Privacy Policy
            </span>
            <p className="text-red-600 text-sm font-light my-1">
              {" "}
              {errors["agreedToTerms"]?.message}
            </p>
          </div>
        </div>

        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          // onClick={() => navigate("/verify-mobile")}
        >
          Continue
        </Button>
        <div className="my-5">
          <div className="" />
          <div className=" bg-white rounded justify-center items-center gap-3 flex w-full">
            <div className="relative">
              <div className="bg-gray-300 h-[1px] w-[270px]"></div>
              <div className="text-gray-400 bg-white -top-1/4 -translate-x-1/2 transform -translate-y-1/2 left-1/2 py-2 px-4 text-xs font-light leading-tight absolute">
                OR
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-col gap-4">
        <Button
          onClick={handleGoogleLogin}
          variant={"outline"}
          className="border-gray-200 text-black w-full relative "
        >
          <div className="absolute left-4">
            <GoogleIcon color="white" fill="white" height={16} width={16} />{" "}
          </div>
          Continue With Google
        </Button>
        {/* <Button
            variant={"outline"}
            className="border-gray-200 bg-blue-linkedin relative hover:bg-blue-linkedInLight hover:text-white flex items-center  text-white  w-full"
          >
            <div className="absolute left-4">
              <Linkedin color="white" fill="white" height={16} width={16} />{" "}
            </div>
            Continue With Linkedin
          </Button> */}
      </div>
    </div>
  );
};

Login.layoutProps = {
  headerProps: {
    routeToGoBack: "hi",
    showShare: "hi",
  },
  pageClassName: "bg-white",
};
export default Login;
