import ListCard from "@/components/common/ListCard/ListCard";
import { ReactComponent as AxisLogo } from "../../assets/img/icons/Axis.svg";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useGetAllJobs from "./hooks/useGetAllJobs";
import ListCardShimmer from "@/components/shimmer/ListCardShimmer";
import { useUser } from "@/contexts/UserContext";
import defaultLogo from "@/assets/img/icons/company_default_logo.jpg";
import "./ShowAllJobs.css";

const ShowAllJobs = () => {
  const { type, jobId } = useParams();
  const [jobList, setJobList] = useState([]);
  const getJobType = () => {
    switch (type) {
      case "similar-jobs":
        return { endpoint: "get-similar-job-list", title: "Similar Jobs" };
      case "featured-jobs":
        return { endpoint: "featured-job", title: "Featured Jobs" };
      case "Fulltime":
        return {
          endpoint: "get-job-by-employement-type",
          payload: "Full Time",
          title: "Fulltime Jobs",
        };
      case "Part-time":
        return {
          endpoint: "get-job-by-employement-type",
          payload: "Part Time",
          title: "Part-time Jobs",
        };
      case "Internship":
        return {
          endpoint: "get-job-by-employement-type",
          payload: "Internship",
          title: "Internships",
        };
      case "new-hiring":
        return { endpoint: "get-new-job-list", title: "New Hiring" };
      case "applied-jobs":
        return {
          endpoint: "get-user-applied-job-details",
          title: "Applied Jobs",
        };
      case "saved-jobs":
        return {
          endpoint: "get-user-saved-job-details",
          title: "Saved Jobs",
        };
      case "top-companies":
        return {
          endpoint: "get-specific-company-job-list",
          title: "Top Companies",
        };
      case "search":
        return {
          endpoint: "get-filtered-job-list",
          title: "Job Available",
        };

      default:
        break;
    }
  };

  const advanceSearch = JSON.parse(localStorage.getItem("advanceSearch"));
  const { fetchNextPage, isLoading, jobs } = useGetAllJobs(
    getJobType()?.endpoint,
    {
      userId: JSON.parse(localStorage.getItem("login_token")),
      type: getJobType()?.payload,
      jobId: jobId,
      employerId: jobId,
      offset: 0,
      limit: 6,
      ...advanceSearch,
    }
  );

  useEffect(() => {
    if (!isLoading) {
      setJobList(jobs);
    }
  }, [isLoading, type, jobs]);

  const lastItemRef = useRef(null);
  const handleIntersection = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      fetchNextPage();
    }
  };
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="relative mb-5">
        <div className="pt-6 px-5 container">
          <div>{getJobType()?.title}</div>
          <div className="overflow-y-auto">
            {jobList?.map((job) => (
              <div className="mt-3 " key={job.id}>
                <ListCard
                  icon={
                    <img
                      src={job?.employer_logo ?? defaultLogo}
                      className="h-11 w-11 object-contain"
                      alt="Employer Logo"
                    />
                  }
                  job={job}
                  route={"/job/" + job.id}
                  jobCard={true}
                />
              </div>
            ))}
            {isLoading && (
              <div className="flex flex-col gap-3 mt-3 overflow-hidden">
                {Array(5)
                  .fill("")
                  .map((item) => (
                    <ListCardShimmer key={item} />
                  ))}
              </div>
            )}
            <div ref={lastItemRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
ShowAllJobs.layoutProps = {
  requiredAuth: true,
};
export default ShowAllJobs;
