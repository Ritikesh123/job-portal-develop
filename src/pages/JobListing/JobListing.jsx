import { Button } from "@/components/common/ui/button";
import { Card, CardContent } from "@/components/common/ui/card";
import ListCard from "@/components/common/ListCard/ListCard";
import { Sheet, SheetContent } from "@/components/common/ui/sheet";
import { useEffect, useState } from "react";
import { saveJob, getJobDetails } from "@/services/OtherService";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate, useParams } from "react-router-dom";
import defaultLogo from "@/assets/img/icons/company_default_logo.jpg";

const JobListing = () => {
  const { id } = useParams();
  const [loggedIn, setLoggedIn] = useLocalStorage("login_token", undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [jobDetails, setJobDetails] = useState({});
  const [userJobDetails, setUserJobDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [applied, setApplied] = useState(false);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [jobId, setJobId] = useState(id);
  const [employerLogo, setEmployerLogo] = useState("");

  const handleSaveJob = async (payload) => {
    try {
      if (isLoading) return;
      if (payload.applied === "Saved") setIsLoading(true);

      const login_token = JSON.parse(localStorage.getItem("login_token"));
      const appliedFlag = payload.applied;
      const response = await saveJob({
        jobId: jobId,
        userId: login_token,
        login_token: login_token,
        appliedFlag,
      });
      // alert(response.message);
      if (response.code == 200) {
        if (payload.applied === "Saved") {
          setIsJobSaved(true);
          setIsLoading(false);
        }
        if (payload.applied === "Applied") setApplied(true);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // setJobId(id);
    setJobId((prevJobId) => id);

    const getJobDetailsHandler = async () => {
      const response = await getJobDetails({
        userId: JSON.parse(localStorage.getItem("login_token")),
        login_token: JSON.parse(localStorage.getItem("login_token")),
        jobId: id,
      });
      if (response?.jobDetails) {
        setJobDetails(response?.jobDetails);
        setUserJobDetails(response?.userJobDetails);
        setSimilarJobs(response?.similarJobList);
        setApplied(response?.userJobDetails[0]?.Applied == 1 ? true : false);
        setIsJobSaved(response?.userJobDetails[0]?.Saved == 1 ? true : false);
        setEmployerLogo(response?.jobDetails?.employer_logo);
      }
    };
    getJobDetailsHandler();
  }, [id]);
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <Card className=" relative p-5 ">
        <CardContent className="p-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <img
                className="w-20 h-20 rounded-full object-contain"
                src={employerLogo ?? defaultLogo}
                alt="Employer Logo"
              />
              <Button
                variant={"outline"}
                className="px-4 py-3"
                onClick={() => {
                  handleSaveJob({ applied: "Saved" });
                }}
                disabled={isLoading || isJobSaved != 0}
              >
                {isLoading
                  ? "Saving..."
                  : isJobSaved != 0
                  ? "Job Saved"
                  : "Save Job"}
              </Button>
            </div>
            <div className="flex gap-2 flex-col my-5">
              <div className="text-black-600 text-xl font-semibold font-['Lexend'] leading-7 overflow-hidden whitespace-nowrap text-ellipsis">
                {jobDetails?.job_title}
              </div>
              <div className=" text-gray-900 text-xl  leading-7 overflow-hidden whitespace-nowrap text-ellipsis">
                {jobDetails?.role_name}
              </div>
              <div className=" text-green-600 text-xl font-semibold leading-7 overflow-hidden whitespace-nowrap text-ellipsis">
                {jobDetails?.dni_category}
              </div>
              <div className=" h-5  text-gray-500 text-sm font-normal leading-tight">
                {jobDetails?.employer_name} • {""}
                {jobDetails?.employement_type} • {jobDetails?.city_name}
              </div>
            </div>
            <Sheet open={showModal}>
              <Button
                className="w-full"
                disabled={applied ? true : false}
                onClick={() => {
                  jobDetails?.applied_job_link
                    ? setShowModal(true)
                    : handleSaveJob({ applied: "Applied" });
                }}
              >
                {applied
                  ? "Applied"
                  : userJobDetails[0]?.Applied == 1
                  ? "Applied"
                  : "Apply Now"}
              </Button>
              <SheetContent side={"bottom"}>
                <div className="max-w-md mx-auto">
                  <img
                    className="w-20 mb-5 h-20 rounded-full object-contain"
                    src={jobDetails?.employer_logo ?? defaultLogo}
                  />
                  <div className=" h-6 mb-2 text-gray-900 text-xl font-</li>semibold leading-7 overflow-hidden whitespace-nowrap text-ellipsis">
                    {jobDetails?.role_name}
                  </div>
                  <div className="h-5  text-gray-500 text-sm font-normal leading-tight">
                    {jobDetails?.employer_name} • {""}
                    {jobDetails?.employement_type} • {jobDetails?.city_name}
                  </div>
                  <div className="h-11 mt-5 mb-9  text-gray-900 text-sm font-light leading-normal">
                    You will be redirected to the company’s job portal to apply
                  </div>
                  <Button
                    className="w-full mb-3"
                    onClick={() =>
                      window.open(jobDetails?.applied_job_link, "_blank")
                    }
                  >
                    Take me there
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="w-full"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <div>
              <div className="my-9">
                <div className=" text-gray-900 text-base font-medium leading-normal">
                  Overview
                </div>
                <div className="  text-gray-600 text-sm font-light leading-normal">
                  {jobDetails?.job_details}
                </div>
              </div>
            </div>
            {jobDetails?.key_responsibilities && (
              <div>
                <div className=" text-gray-900 text-base font-medium leading-normal">
                  What you’ll do
                </div>
                <ul className=" pl-5 list-disc   text-gray-600 text-sm font-light leading-normal">
                  {jobDetails?.key_responsibilities?.split(",").map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {similarJobs.length > 0 && (
        <div>
          {" "}
          <div className="mt-9 mb-4 h-5 flex justify-between align-center">
            <div className="  text-gray-600 text-base font-medium leading-normal">
              Similar Jobs
            </div>

            <Button
              variant={"ghost"}
              className="h-4 text-right px-[0.25rem] py-3  text-slate-700 text-sm font-normal leading-tight"
              onClick={() => navigate(`/showAll/similar-jobs/${jobId}`)}
            >
              Show All
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            {similarJobs?.map((job) => (
              <ListCard
                title={job?.role_name}
                icon={
                  <img
                    src={job?.employer_logo ?? defaultLogo}
                    className="h-11 w-11 object-contain"
                    alt="Employer Logo"
                  />
                }
                key={job.id}
                route={"/job/" + job.id}
                job={job}
                properties={[
                  job.employement_type,
                  job.company_name,
                  job.city_name,
                ]}
                jobCard={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListing;
