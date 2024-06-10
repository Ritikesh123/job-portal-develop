import { CardContent, Card } from "@/components/common/ui/card";
import { Input } from "@/components/common/ui/input";
import { Button } from "@/components/common/ui/button";
import ListCard from "@/components/common/ListCard/ListCard";
import React, { useEffect } from "react";
import {
  getHomePageData,
  getTopCompanies,
  getNewJobList,
} from "@/services/OtherService";
import { useState } from "react";
import { ReactComponent as AxisLogo } from "@/assets/img/icons/Axis.svg";
import Fulltime from "@/assets/img/icons/fulltime.png";
import Parttime from "@/assets/img/icons/parttime.png";
import Internship from "@/assets/img/icons/internship.png";
import { Search, Bookmark, Briefcase } from "lucide-react";
import DEFAULT_FEATURED_JOBS from "@/constants/mockData/featuredJob";
import Slider from "react-slick";
import BottomNavBar from "./BottomNavBar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RecommmenedJobCard from "./component/RecommmenedJobCard";
import TopCompaniesCard from "./component/TopCompaniesCard";
import useGetRecommendedJobs from "./hooks/useGetRecommendedJobs";
import ListCardShimmer from "@/components/shimmer/ListCardShimmer";
import { getAllJobs } from "@/services/JobService";
import defaultLogo from "@/assets/img/icons/company_default_logo.jpg";
import paymentBanner from "@/assets/img/icons/payment_banner.png";
import useGetPaymentStatus from "./hooks/useGetPaymentStatus";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const recommendedJobsCarousel = {
  customPaging: (i) => {
    return (
      <a>
        <div className="swipe-dots"></div>
      </a>
    );
  },
  dots: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
  cssEase: "linear",
  swipeToSlide: true,
  variableWidth: true,
};

const TopJobsCarousel = {
  customPaging: (i) => {
    return (
      <a>
        <div className="swipe-dots"></div>
      </a>
    );
  },
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3500,
  autoplaySpeed: 3500,
  arrows: false,
  cssEase: "linear",
  swipeToSlide: true,
  variableWidth: true,
  centerPadding: 30,
};

const JobMainPage = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [topCompanies, setTopCompanies] = useState([]);
  const [newHiringJobs, setNewHiringJobs] = useState([]);
  const [jobCount, setJobCount] = useState({
    appliedJobCount: 0,
    savedJobCount: 0,
    sharedJobCount: 0,
  });
  const navigate = useNavigate();

  const login_token = JSON.parse(localStorage.getItem("login_token"));

  const { data: recommendedJobs, isLoading: recommendedJobLoading } =
    useGetRecommendedJobs({
      userId: login_token,
      limit: 10,
      offset: 0,
    });
  const { data: paymentStatus, refetch: fetchPaymentStatus } =
    useGetPaymentStatus({ userId: login_token });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getHomePageData({
        userId: login_token,
        login_token: login_token,
      });
      setJobCount({
        appliedJobCount: response.jobActionCount?.appliedJobCount,
        savedJobCount: response.jobActionCount?.saveJobCount,
        sharedJobCount: response.jobActionCount?.shareJobCount,
      });

      if (response?.jobList?.length > 0) {
        const transformedJobs = response?.jobList?.map((job) => ({
          id: job.id,
          title: job.role_name,
          icon: <AxisLogo className="h-11 w-11" />,
          route: "",
          properties: ["Full-time", job.company_name, job.city_name],
        }));

        setFeaturedJobs(transformedJobs);
      }
    };
    fetchData();

    const fetchNewHiringJobs = async () => {
      const response = await getAllJobs("get-new-job-list", {
        userId: login_token,
        offset: 0,
        limit: 4,
      });

      if (response?.data?.length > 0) {
        setNewHiringJobs(response.data);
      }
    };

    fetchNewHiringJobs();

    const fetchTopCompanies = async () => {
      const response = await getTopCompanies({
        userId: login_token,
        login_token: login_token,
      });

      if (response?.data?.length > 0) {
        setTopCompanies(response?.data);
      }
    };

    fetchTopCompanies();
  }, []);

  const displayPayment = (timeStamp, status) => {
    if (status != "success") {
      return true;
    }
    if (!timeStamp) {
      return true;
    }
    const providedTime = new Date(timeStamp);
    const currentTime = new Date();
    const diffInMinutes = (currentTime - providedTime) / (1000 * 60);
    if (diffInMinutes <= 5) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <div className="relative">
        <div className="pt-6">
          <div className="px-5 ">
            <div className="flex gap-2 w-full border-[1px] text-base  bg-white px-4 py-2 items-center ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 border-defaultSlate-300 rounded-md ">
              <Search />
              <Input
                onClick={() => navigate("/search-jobs")}
                className="border-none rounded-sm text-base h-[24px]"
                placeholder="Search Jobs"
              />
            </div>
          </div>

          <div className=" mb-5">
            <div className=" mb-8 mt-10 text-gray-600 text-base font-medium leading-normal">
              <div className="mt-9">
                <div className=" h-5 px-5 text-gray-600 text-base font-medium leading-normal">
                  Overview
                </div>
                <div className="px-5">
                  <div className="flex justify-between mt-4 w-full ">
                    <Card
                      className="w-[48%] h-[84px] rounded-xl cursor-pointer"
                      onClick={() => {
                        navigate("/showAll/saved-jobs");
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="w-6 h-5  text-gray-900 text-xl font-semibold leading-7">
                          {jobCount.savedJobCount ?? 0}
                        </div>
                        <div className=" text-gray-600 text-sm font-normal leading-tight  mt-3 flex gap-4 justify-between">
                          Saved
                          <div>
                            <Bookmark width={16} height={16} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className="w-[48%] h-[84px] rounded-xl cursor-pointer"
                      onClick={() => {
                        navigate("/showAll/applied-jobs");
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="w-6 h-5  text-slate-700 text-xl font-semibold leading-7">
                          {jobCount.appliedJobCount ?? 0}
                        </div>
                        <div className=" text-gray-600 text-sm font-normal leading-tight mt-3 flex justify-between">
                          Applied
                          <div>
                            <Briefcase
                              width={16}
                              height={16}
                              className="text-slate-700"
                            />
                          </div>
                        </div>{" "}
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {displayPayment(
                  paymentStatus?.transacton_date,
                  paymentStatus?.status
                ) && (
                  <div className="px-5 mt-10">
                    <div className="w-full h-28  relative rounded-xl">
                      <div className=" w-full absolute">
                        <img
                          className="w-full h-28 rounded-xl"
                          src={paymentBanner}
                        />
                      </div>
                      <div className="w-full h-28 absolute bg-indigo-700 top-0 left-0 bg-opacity-90 rounded-xl flex flex-col justify-center items-center p-3">
                        {paymentStatus?.status == "pending" ? (
                          <>
                            <div className="w-full h-9 text-white text-xs font-normal font-['Lexend'] leading-snug">
                              <p>
                                Email your Resume to 5000+ HR Agencies in India
                                at
                              </p>
                              ONLY INR 399/-
                            </div>

                            <div
                              className="w-25 h-8 px-4 py-3 bg-indigo-700 rounded-md border border-indigo-500 justify-center items-center gap-2.5 inline-flex cursor-pointer"
                              onClick={() =>
                                window.open(
                                  `${BASE_URL}/cashfree/payments/create/${JSON.parse(
                                    localStorage.getItem("login_token")
                                  )}`,
                                  "_blank"
                                )
                              }
                            >
                              <div className="text-white text-sm font-medium font-['Lexend'] leading-normal">
                                Pay Now
                              </div>
                            </div>
                          </>
                        ) : paymentStatus?.status == "success" ? (
                          <div className="text-white text-lg font-normal font-['Lexend'] leading-snug">
                            Payment Success
                          </div>
                        ) : (
                          <>
                            <div className="w-full h-9 text-white text-xs font-normal font-['Lexend'] leading-snug">
                              Email your Resume to 5000+ HR Agencies in India at
                              <br />
                              ONLY INR 399/-
                            </div>
                            <a>
                              <div
                                className="w-25 h-8 px-4 py-3 bg-indigo-700 rounded-md border border-indigo-500 justify-center items-center gap-2.5 inline-flex cursor-pointer"
                                onClick={() =>
                                  window.open(
                                    `${BASE_URL}/cashfree/payments/create/${JSON.parse(
                                      localStorage.getItem("login_token")
                                    )}`,
                                    "_blank"
                                  )
                                }
                              >
                                <div className="text-white text-sm font-medium font-['Lexend'] leading-normal">
                                  Retry
                                </div>
                              </div>
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className=" h-52 mb-10 ">
                  <div className="w-[316px] px-5 h-5 mb-4 mt-10 text-gray-600 text-base font-medium leading-normal">
                    Recommended jobs
                  </div>
                  <Slider
                    className="pl-5 h-[150px] flex gap-10 no-absolute-dots "
                    {...recommendedJobsCarousel}
                  >
                    {recommendedJobs?.data?.map((item) => (
                      <div key={item.id}>
                        <RecommmenedJobCard
                          applicant_count={item.applicant_count}
                          title={item.job_title}
                          role={item.job_role_name}
                          employer_logo={item?.employer_logo}
                          onClick={() => {
                            navigate("/job/" + item.id);
                          }}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="px-5">
                  <div>Search by Job Type</div>
                  <div className="flex justify-between mt-4">
                    {["Fulltime", "Part-time", "Internship"].map(
                      (item, key) => (
                        <div
                          key={key}
                          className="w-24 h-24 p-5 bg-white rounded-xl shadow border-gray-200 flex-col justify-center items-start gap-5 inline-flex cursor-pointer"
                          onClick={() => navigate("/showAll/" + item)}
                        >
                          <div className="flex flex-col items-center justify-center">
                            <img
                              className="w-8 h-8"
                              src={
                                item === "Fulltime"
                                  ? Fulltime
                                  : item === "Part-time"
                                  ? Parttime
                                  : Internship
                              }
                            />

                            <div className="w-14 h-4 text-center text-gray-600 text-xs font-light font-['Lexend'] leading-tight mt-1">
                              {item}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className=" h-[120px] px-5 mt-9 ">
                  <div className=" h-5  text-gray-600 text-base font-medium leading-normal mb-4">
                    Top Companies
                  </div>
                  <Slider
                    className=" h-[150px] no-absolute-dots center  flex gap-2 right-slider-center-mode long-dots"
                    {...TopJobsCarousel}
                  >
                    {topCompanies.map((company, key) => (
                      <TopCompaniesCard
                        company={company}
                        key={key}
                        onClick={() =>
                          navigate(
                            `/showAll/top-companies/${company.employer_id}`
                          )
                        }
                      />
                    ))}
                  </Slider>
                </div>
              </div>

              <div className="my-11 px-5">
                <div className="w-full  flex justify-between items-center mb-4">
                  <div className=" text-gray-600 text-base font-semibold leading-loose">
                    New Hiring
                  </div>
                  <Link to={"/showAll/new-hiring"}>
                    <Button
                      variant={"ghost"}
                      className="text-right px-3 py-2 text-slate-700 text-sm font-normal leading-tight"
                    >
                      Show All
                    </Button>
                  </Link>
                </div>
                <div className=" flex flex-col gap-4">
                  {newHiringJobs.map((job) => (
                    <ListCard
                      key={job.id}
                      job={job}
                      route={"/job/" + job.id}
                      jobCard={true}
                      icon={
                        <img
                          src={job?.employer_logo ?? defaultLogo}
                          className="h-11 w-11 object-contain"
                          alt="Employer Logo"
                        />
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <BottomNavBar className="" /> */}
      </div>
    </>
  );
};

JobMainPage.layoutProps = {
  requiredAuth: true,
};

export default JobMainPage;
