import { Button } from "@/components/common/ui/button";
import React, { useRef, useState } from "react";
import { Card, CardContent } from "../../components/common/ui/card";
import { UploadCloud } from "lucide-react";
import { uploadResume } from "@/services/OtherService";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const UploadResumeOne = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleSkipNavigation = () => {
    navigate("/create-profile");
  };

  const { userData, setUserData } = useUser();

  const handleFile = (acceptedFile) => {
    const file = acceptedFile.target.files[0];
    const allowedFormats = [".pdf", ".docx", ".doc"];
    const fileExtension = file.name.slice(
      ((file.name.lastIndexOf(".") - 1) >>> 0) + 2
    );
    if (allowedFormats.includes(`.${fileExtension.toLowerCase()}`)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "userId",
        JSON.parse(localStorage.getItem("login_token"))
      );

      const uploadResumeFile = async () => {
        try {
          const response = await uploadResume(formData);

          const { email, mobile, dob, name, experience } = response.data;

          setUserData({ email, mobile, dob, name, experience });

          navigate("/create-profile");
        } catch (error) {
          console.error("Error uploading resume:", error);
          throw error;
        }
      };

      uploadResumeFile();
      //API Call goes here with formData as Body
      setUploadMessage(file.name);
      // window.alert(`${file.name} uploaded`);
    } else {
      window.alert("Incorrect file format");
      setUploadMessage("Incorrect File Format");
    }
  };

  return (
    <div className="px-5 pt-6 pb-11 flex flex-col justify-between gap-9">
      <div>
        <div>
          <div className=" text-gray-900 text-2xl font-semibold leading-loose">
            Upload Your Resume
          </div>
          <div className="  text-gray-500 text-xs font-light leading-tight">
            Save time with super-fast Profile Auto-Fill feature when you Upload
            your Resume
          </div>
        </div>
        <Card className="rounded-md">
          <CardContent className="p-5 mt-6 ">
            <div className="flex flex-col">
              <div className="p-5 left-0 top-0  bg-slate-50 border-slate-400 border-[1px] border-dashed rounded-lg  shadow flex-col  h-[288px]">
                {" "}
                <UploadCloud className="h-[72px] w-[72px] text-slate-700 mx-auto mb-3" />
                <div className=" h-5 text-center text-gray-600 text-sm font-medium leading-[14px]">
                  Supported File Formats
                </div>
                <div className=" h-5 text-center text-gray-600 text-xs font-light leading-tight">
                  (.pdf, .docx, .doc)
                </div>
                <input
                  className="hidden"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFile}
                ></input>
                <Button
                  className="w-full mt-7"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload Resume
                </Button>
              </div>
            </div>{" "}
          </CardContent>
        </Card>
      </div>
      <Button
        variant={"outline"}
        className="w-full"
        onClick={handleSkipNavigation}
      >
        Skip & Manually Fill Details
      </Button>
    </div>
  );
};
UploadResumeOne.layoutProps = {
  requiredAuth: true,
};
export default UploadResumeOne;
