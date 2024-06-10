import React, { useState, useEffect } from "react";
import { Input } from "../../components/common/ui/input";
import { Search, Share2 } from "lucide-react";
import { Button } from "../../components/common/ui/button";
import { AspectRatio } from "../../components/common/ui/aspect-ratio";
import ListCard from "../../components/common/ListCard/ListCard";
import { Card, CardContent } from "../../components/common/ui/card";
import Openhire from "../../components/Icons/Openhire";
import IndiaVirtualImg from "../../assets/img/images/Home/IndiasLeading.png";
import FEATURED_JOBS from "@/constants/mockData/featuredJob";
import Slider from "react-slick";
import DEFAULT_OUR_PARTNERS from "@/constants/mockData/ourPartners";
import defaultLogo from "@/assets/img/icons/company_default_logo.jpg";
import { getAllJobs } from "@/services/JobService";
import {
  getTestingMonials,
  subscribeNewsLetter,
} from "@/services/OtherService";
import { ReactComponent as AxisLogo } from "@/assets/img/icons/Axis.svg";
import { ReactComponent as SbiLogo } from "@/assets/img/icons/SBI.svg";
import { ReactComponent as KotakLogo } from "@/assets/img/icons/Kotak.svg";
import { ReactComponent as HdfcLogo } from "@/assets/img/icons/Hdfc.svg";
import { Link, useNavigate } from "react-router-dom";
import useGetPromotionList from "./Hooks/useGetPromotionList";
import { Sheet, SheetContent } from "@/components/common/ui/sheet";
import { ShareSocial } from "react-share-social";
import companyLogo from "@/assets/img/icons/mainLogo.png";
const TrustedPartnerCarouselSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",
  swipeToSlide: true,
  arrows: false,
};

const howItWorksCarouselSettings = {
  dots: false,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
  // cssEase: "linear",
  swipeToSlide: true,
  cssEase: "linear",
  // className: "center",
  centerMode: true,

  centerPadding: 20,
};

const adsCarouselSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  cssEase: "linear",
};
export const sanitizeHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.innerHTML;
};
const Home = () => {
  const navigate = useNavigate();

  const [featuredJob, setFeaturedJob] = useState([]);
  const [testiMonials, setTestiMonials] = useState([]);
  const [subscribeEmail, setSubscribeEmail] = useState(null);
  const isSubscribed = localStorage.getItem("subscribed");
  const [showModal, setShowModal] = useState(false);

  const { data } = useGetPromotionList();

  const login_token = localStorage.getItem("login_token");

  const loginHandlerNavigate = () => {
    navigate("/login");
  };

  const employerLoginHandlerNavigate = () => {
    window.location.href = `${import.meta.env.VITE_EMPLOYER_LOGIN_URL}`;
  };

  useEffect(() => {
    if (login_token) {
      navigate("/jobs");
    }
    const fetchData = async () => {
      try {
        const featuredJobsResponse = await getAllJobs("featured-job", {
          limit: 4,
          offset: 0,
        });
        setFeaturedJob(featuredJobsResponse.featuredJob);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const fetchDataTestimonial = async () => {
      try {
        const responseTestimonial = await getTestingMonials();
        setTestiMonials(responseTestimonial.testimonialsList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataTestimonial();
  }, []);

  const subscribeEmailHandler = (e) => {
    setSubscribeEmail(e.target.value);
  };

  const handleNewsletterSubscribe = async () => {
    try {
      const response = await subscribeNewsLetter({ email: subscribeEmail });
      localStorage.setItem("subscribed", true);
    } catch (error) {
      console.error("Error subscribing email:", error);
    }
  };

  return (
    <div className="w-full flex flex-col relative  pt-5 bg-white">
      <div className="px-4">
        <div className="flex gap-2 w-full border bg-white px-4 py-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 border-violet-500 rounded h-[52px]">
          <Search />
          <Input
            onClick={() => navigate("/search-jobs")}
            className="border-none rounded-sm h-full font-bold text-slate-700 placeholder:text-slate-700 text-lg"
            placeholder="Search for DEI Jobs"
          />
        </div>
        <div className="w-full mt-8 text-gray-900 text-3xl leading-9">
          Uniting Diversity!
        </div>
        <div className="w-full text-gray-900 text-3xl leading-9">
          Building a Community!
        </div>
        <div className="w-full text-gray-900 text-1xl leading-9">
          Promoting Inclusivity through Opportunity
        </div>
        <div className="w-full mt-5 text-gray-900 text-sm font-light leading-normal">
          Connecting Multi-talented Job Seekers with D&I Jobs.
        </div>
        <div className="w-full text-gray-900 text-sm font-light leading-normal">
          Find the job you love here.
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <Button onClick={loginHandlerNavigate}>Candidate Signup/Login</Button>
          <Button onClick={employerLoginHandlerNavigate} variant={"outline"}>
            {" "}
            Employer Signup/Login
          </Button>
        </div>
      </div>
      <Slider className="w-full mt-9" {...adsCarouselSettings}>
        {data?.map((item) => (
          <AspectRatio ratio={3 / 2} key={item.id}>
            <a rel="noopener noreferrer" href={item.url} target="_blank">
              {" "}
              <img className="w-full h-full object-cover " src={item.image} />
            </a>
          </AspectRatio>
        ))}
      </Slider>
      <div className="my-11">
        <div className="w-full px-6 flex justify-between items-center">
          <div className="text-gray-600 text-2xl font-semibold leading-loose">
            Featured Jobs
          </div>
          <Link to={"/showAll/featured-jobs"}>
            <Button
              variant={"ghost"}
              className="text-right px-3 py-2 text-slate-700 text-sm font-normal leading-tight"
            >
              Show All
            </Button>
          </Link>
        </div>

        <div className="px-4 flex flex-col gap-4">
          {featuredJob?.map((job) => (
            <ListCard
              key={job.id}
              id={job.id}
              title={job.job_title}
              job={job}
              icon={
                <img
                  src={job?.employer_logo ?? defaultLogo}
                  className="h-11 w-11 object-contain"
                  alt="Employer Logo"
                />
              }
              route={login_token ? "/job/" + job.id : "/login"}
              properties={[job.employement_type, job.organization, job.city]}
              jobCard={true}
              postedBy={job?.posted_by}
            />
          ))}
        </div>
      </div>
      <div className="py-6 bg-slate-50">
        <div className="w-full h-5 text-center text-slate-700 text-sm font-medium leading-normal">
          OUR TRUSTED PARTNERS
        </div>
        <Slider {...TrustedPartnerCarouselSettings} className="mt-5">
          {DEFAULT_OUR_PARTNERS}
        </Slider>
      </div>

      <div className="px-5 mt-[60px]">
        <div className=" text-slate-700 text-sm font-medium leading-tight">
          Why DEI JOBS
        </div>
        {/* <div className="   text-gray-900 text-2xl font-semibold leading-8 ">
          Why “DEI Jobs”
        </div> */}
        <div className="w-full mt-3 text-gray-600 text-sm font-light leading-normal">
          Experience a first in India with DEI Jobs: a dedicated platform
          connecting you to organisations that champion allyship, providing
          access to career-boosting services.
          <br />
          <br />
          Join DEI Jobs to connect with the perfect organisation, stay informed
          about industry trends, and host your resume to share with potential
          employers.
        </div>
        <div className="w-full mt-8 rounded-xl">
          <AspectRatio ratio={1 / 1}>
            <img
              className="object-cover w-full h-full rounded-xl"
              src={"1.png"}
            />
          </AspectRatio>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="w-full  text-gray-900 text-lg font-semibold leading-7">
            Diversity
          </div>
          <div className="w-full  text-gray-600 text-sm font-light leading-normal">
            In the workplace, diversity embraces people from a wide range of
            ethnicities, sexual orientations, socioeconomic backgrounds, age
            groups, genders, religions, and all the unique aspects that define
            us as individuals. Unfortunately, bias is frequently used to create
            divisions among diverse individuals based on these aspects.
            <br />
            <br />
            DEI is dedicated to broadening our collective perspective and
            fostering an inclusive ecosystem where everyone can thrive.
          </div>
        </div>
        <div className="w-full mt-8 rounded-xl">
          <AspectRatio ratio={1 / 1}>
            <img
              className="object-cover w-full h-full rounded-xl"
              src={"2.png"}
            />
          </AspectRatio>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="w-full  text-gray-900 text-lg font-semibold leading-7">
            Equity
          </div>
          <div className="w-full  text-gray-600 text-sm font-light leading-normal">
            Workplace equity is the commitment to ensuring every employee has
            equal access to opportunities, resources, and fair treatment
            eliminating discrimination and enabling organisations and job
            seekers to achieve their potential.
            <br />
            <br /> DEI jobs connect job seekers with organisations that value
            employees based on their skills, knowledge, and abilities, rather
            than their personal characteristics.
          </div>
        </div>
        <div className="w-full mt-8 rounded-xl">
          <AspectRatio ratio={1 / 1}>
            <img
              className="object-cover w-full h-full rounded-xl"
              src={"3.png"}
            />
          </AspectRatio>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="w-full  text-gray-900 text-lg font-semibold leading-7">
            Inclusion
          </div>
          <div className="w-full  text-gray-600 text-sm font-light leading-normal">
            Inclusion means employees are cherished and embraced, irrespective
            of their background or situation.
            <br />
            <br /> DEI Jobs showcases workplaces that cultivate a profound sense
            of belonging among colleagues.
          </div>
        </div>
      </div>
      <div className="bg-slate-700 mt-[60px] py-[60px] px-5 relative">
        <div>
          <div className=" text-slate-300 text-sm font-medium leading-tight">
            HOW IT WORKS
          </div>
          <div className="w-80  text-white text-2xl font-semibold leading-8">
            Catapult your career into D&I job opportunities
          </div>
        </div>
        <div className="mt-[50px] mb-[64px]">
          <Slider
            className="w-full h-[340px] left-0 top-[0px] relative right-slider-center-mode"
            {...howItWorksCarouselSettings}
          >
            <div className="h-[340px] relative">
              <div className="w-[225px] bottom-4 left-8 absolute text-center text-white text-base font-normal leading-normal">
                Create a DEI Jobs Account
              </div>
              <div className="w-[248.58px] h-[247.62px]  absolute">
                <div className="w-[225.54px] h-[225.54px] left-[23.03px] top-[22.07px] absolute bg-gray-100 rounded-[18.09px]">
                  <div className="w-[189.90px] h-[189.90px] left-[36.17px] top-[36.17px] absolute bg-white rounded-tl-[13.56px]" />
                  <div className="h-[59.91px] left-[63.30px] top-[63.30px] absolute">
                    <div className="left-0 top-0 absolute text-gray-900 text-sm font-medium">
                      Username
                    </div>
                    <div className="w-[162.77px] h-[33.91px] left-0 top-[26px] absolute">
                      <div className="w-[162.77px] h-[33.91px] left-0 top-0 absolute bg-gray-100 rounded-sm" />
                      <div className="w-[68.30px] h-5 left-[13.56px] top-[7.91px] absolute">
                        <div className="left-0 top-0 absolute text-gray-900 text-sm font-normal leading-tight">
                          your_user
                        </div>
                        <div className="left-[63.30px] top-[-0px] absolute text-gray-900 text-sm font-normal leading-tight">
                          |
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[59.91px] left-[63.30px] top-[136.78px] absolute">
                    <div className="left-0 top-0 absolute text-gray-900 text-sm font-medium">
                      Password
                    </div>
                    <div className="w-[162.77px] h-[33.91px] left-0 top-[26px] absolute">
                      <div className="w-[162.77px] h-[33.91px] left-0 top-0 absolute bg-gray-100 rounded-sm" />
                      <div className="w-[5.65px] h-[5.65px] left-[13.56px] top-[14.69px] absolute bg-gray-900 rounded-full" />
                      <div className="w-[5.65px] h-[5.65px] left-[26px] top-[14.69px] absolute bg-gray-900 rounded-full" />
                      <div className="w-[5.65px] h-[5.65px] left-[38.43px] top-[14.69px] absolute bg-gray-900 rounded-full" />
                      <div className="w-[5.65px] h-[5.65px] left-[50.87px] top-[14.69px] absolute bg-gray-900 rounded-full" />
                      <div className="w-[5.65px] h-[5.65px] left-[63.30px] top-[14.69px] absolute bg-gray-900 rounded-full" />
                      <div className="w-[5.65px] h-[5.65px] left-[75.74px] top-[14.69px] absolute bg-gray-900 rounded-full" />
                      <div className="w-[5.65px] h-[5.65px] left-[88.17px] top-[14.69px] absolute bg-gray-900 rounded-full" />
                      <div className="w-[5.65px] h-[5.65px] left-[100.60px] top-[14.69px] absolute bg-gray-900 rounded-full" />
                      <div className="w-[5.65px] h-[5.65px] left-[113.04px] top-[14.69px] absolute bg-gray-900 rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="w-[46.07px] h-[46.07px] left-0 top-0 absolute">
                  <div className="w-[46.07px] h-[46.07px] left-0 top-0 absolute bg-violet-500 rounded-full border-2 border-gray-900" />
                  <div className="w-[9.42px] h-[32.98px] left-[18.43px] top-[6.45px] absolute text-center text-white text-[22.52px] font-semibold leading-[33.78px]">
                    1
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[340px] relative">
              <div className="w-[227px] left-8 bottom-4 absolute text-center text-white text-base font-normal leading-normal">
                Host & Share your Resume
              </div>
              <div className="w-[248.58px] h-[247.62px] absolute">
                <div className="w-[225.54px] h-[225.54px] left-[23.03px] top-[22.07px] absolute bg-gray-100 rounded-[18.04px]">
                  <div className="w-[153.37px] h-[189.46px] left-[36.09px] top-[36.09px] absolute bg-white rounded-tl-[13.53px] rounded-tr-[13.53px]" />
                  <div className="left-[87.12px] top-[54.13px] absolute text-center text-gray-900 text-sm font-semibold">
                    Resume
                  </div>
                  <div className="w-[46.24px] h-[5.64px] left-[54.13px] top-[89.09px] absolute bg-slate-300 rounded-[33.83px]" />
                  <div className="w-[89.09px] h-[5.64px] left-[54.13px] top-[115.03px] absolute bg-slate-300 rounded-[33.83px]" />
                  <div className="w-[67.66px] h-[5.64px] left-[54.13px] top-[140.96px] absolute bg-slate-300 rounded-[33.83px]" />
                  <div className="w-[34.96px] h-[5.64px] left-[54.13px] top-[166.90px] absolute bg-slate-300 rounded-[33.83px]" />
                  <div className="w-[34.96px] h-[5.64px] left-[93.60px] top-[166.90px] absolute bg-slate-300 rounded-[33.83px]" />
                  <div className="w-[84.58px] h-[5.64px] left-[54.13px] top-[192.84px] absolute bg-slate-300 rounded-[33.83px]" />
                </div>
                <div className="w-[46.07px] h-[46.07px] left-0 top-0 absolute">
                  <div className="w-[46.07px] h-[46.07px] left-0 top-0 absolute bg-violet-500 rounded-full border-2 border-gray-900" />
                  <div className="w-[9.42px] h-[32.98px] left-[18.43px] top-[6.45px] absolute text-center text-white text-[22.52px] font-semibold leading-[33.78px]">
                    2
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="h-[340px] relative ">
              <div className="w-[226px] left-8 bottom-4 absolute text-center text-white text-base font-normal leading-normal">
                Apply Easily to D&I Jobs and Sharing
              </div>
              <div className="w-[248.58px] h-[247.62px]  absolute">
                <div className="w-[225.54px] h-[225.54px] left-[23.03px] top-[22.07px] absolute bg-gray-100 rounded-[18.04px]">
                  <div className="w-[189.46px] h-[189.46px] left-[36.09px] top-[36.09px] absolute bg-white rounded-tl-[13.53px]" />
                  <div className="h-11 left-[72.17px] top-[72.17px] absolute">
                    <div className="w-[27.07px] h-[27.07px] left-0 top-0 absolute justify-center items-center inline-flex">
                      <div className="w-[27.07px] h-[27.07px] relative"></div>
                    </div>
                    <div className="w-[112.77px] h-11 left-[40.60px] top-[-0px] absolute">
                      <div className="w-[112.77px] h-[5.64px] left-0 top-0 absolute bg-slate-300 rounded-[33.83px]" />
                      <div className="w-[112.77px] h-[5.64px] left-0 top-[19.17px] absolute bg-slate-300 rounded-[33.83px]" />
                      <div className="w-[112.77px] h-[5.64px] left-0 top-[38.34px] absolute bg-slate-300 rounded-[33.83px]" />
                    </div>
                  </div>
                  <div className="h-11 left-[72.17px] top-[143.22px] absolute">
                    <div className="w-[27.07px] h-[27.07px] left-0 top-0 absolute justify-center items-center inline-flex">
                      <div className="w-[27.07px] h-[27.07px] relative"></div>
                    </div>
                    <div className="w-[112.77px] h-11 left-[40.60px] top-[-0px] absolute">
                      <div className="w-[112.77px] h-[5.64px] left-0 top-0 absolute bg-slate-300 rounded-[33.83px]" />
                      <div className="w-[112.77px] h-[5.64px] left-0 top-[19.17px] absolute bg-slate-300 rounded-[33.83px]" />
                      <div className="w-[112.77px] h-[5.64px] left-0 top-[38.34px] absolute bg-slate-300 rounded-[33.83px]" />
                    </div>
                  </div>
                </div>
                <div className="w-[46.07px] h-[46.07px] left-0 top-0 absolute">
                  <div className="w-[46.07px] h-[46.07px] left-0 top-0 absolute bg-violet-500 rounded-full border-2 border-gray-900" />
                  <div className="w-[9.42px] h-[32.98px] left-[18.43px] top-[6.45px] absolute text-center text-white text-[22.52px] font-semibold leading-[33.78px]">
                    3
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[340px] relative ">
              <div className="w-[226px] left-8 bottom-4 absolute text-center text-white text-base font-normal leading-normal">
                India’s Top DEI Organisations
              </div>
              <div className="w-[248.58px] h-[247.62px]  absolute">
                <div className="w-[225.54px] h-[225.54px] left-[23.03px] top-[22.07px] absolute bg-gray-100 rounded-[18.04px]">
                  <div className="w-[189.46px] h-[189.46px] left-[36.09px] top-[36.09px] absolute bg-white rounded-tl-[13.53px]" />
                  <div className="h-11 left-[72.17px] top-[72.17px] absolute">
                    <div className="w-[27.07px] h-[27.07px] left-0 top-0 absolute justify-center items-center inline-flex">
                      <div className="w-[27.07px] h-[27.07px] relative"></div>
                    </div>
                    <div className="w-[112.77px] h-11 left-[40.60px] top-[-0px] absolute">
                      <div className="w-[112.77px] h-[5.64px] left-0 top-0 absolute bg-slate-300 rounded-[33.83px]" />
                      <div className="w-[112.77px] h-[5.64px] left-0 top-[19.17px] absolute bg-slate-300 rounded-[33.83px]" />
                      <div className="w-[112.77px] h-[5.64px] left-0 top-[38.34px] absolute bg-slate-300 rounded-[33.83px]" />
                    </div>
                  </div>
                  <div className="h-11 left-[72.17px] top-[143.22px] absolute">
                    <div className="w-[27.07px] h-[27.07px] left-0 top-0 absolute justify-center items-center inline-flex">
                      <div className="w-[27.07px] h-[27.07px] relative"></div>
                    </div>
                    <div className="w-[112.77px] h-11 left-[40.60px] top-[-0px] absolute">
                      <div className="w-[112.77px] h-[5.64px] left-0 top-0 absolute bg-slate-300 rounded-[33.83px]" />
                      <div className="w-[112.77px] h-[5.64px] left-0 top-[19.17px] absolute bg-slate-300 rounded-[33.83px]" />
                      <div className="w-[112.77px] h-[5.64px] left-0 top-[38.34px] absolute bg-slate-300 rounded-[33.83px]" />
                    </div>
                  </div>
                </div>
                <div className="w-[46.07px] h-[46.07px] left-0 top-0 absolute">
                  <div className="w-[46.07px] h-[46.07px] left-0 top-0 absolute bg-violet-500 rounded-full border-2 border-gray-900" />
                  <div className="w-[9.42px] h-[32.98px] left-[18.43px] top-[6.45px] absolute text-center text-white text-[22.52px] font-semibold leading-[33.78px]">
                    4
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
        <Link to={"/login"}>
          <Button variant={"outline"} className="w-full">
            Job Seeker Signup
          </Button>
        </Link>
      </div>
      <div className="bg-slate-50 py-[60px] px-5">
        <div className="w-full">
          <div className="w-full text-slate-700 text-sm font-medium leading-tight">
            NEWSLETTERS
          </div>
          {/* <div className="w-full text-gray-900 text-2xl font-semibold leading-8">
            The best Openhire
            <br />
            articles every day
          </div> */}
        </div>
        <div className="w-full text-gray-600 text-sm font-light leading-normal ">
          Join the community of job seekers and stay connected with a range of
          topics and aspects that revolve around D&I. Receive regular updates
          and learn how to navigate workplace dynamics
        </div>
        <div className="relative my-9">
          <Slider
            className="h-[226px]  left-0 top-0 relative  right-slider-center-mode"
            {...howItWorksCarouselSettings}
          >
            {testiMonials?.map((temp, i) => (
              <div key={i} className="pr-4">
                <Card className="rounded-xl max-w-[290px] ">
                  <CardContent className="p-5 ">
                    <div className="self-stretch flex-col justify-start items-start gap-2.5 inline-flex">
                      <div className="h-[186px] flex-col justify-start items-start gap-4 flex">
                        <div className="h-[34px] pr-1 justify-start items-center inline-flex">
                          <div className=" self-stretch relative">
                            <img
                              className="w-[34px] h-[34px] rounded-[150px] object-contain"
                              src={temp.image}
                            />
                            <div className=" h-[34px] left-[49px] top-0 absolute flex-col justify-start items-start gap-0.5 inline-flex">
                              <div className="w-40 h-4 text-gray-900 text-sm font-light leading-normal">
                                {temp.title}
                              </div>
                              <div className=" h-4 text-gray-500 text-xs font-light leading-tight">
                                {temp.created_at}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="h-[100px] flex-col justify-start items-start gap-2 flex">
                          <div className=" h-6 text-gray-900 text-sm font-normal leading-tight">
                            {temp.title}
                          </div>
                          <div
                            className="  text-gray-400 text-xs font-light leading-tight overflow-hidden line-clamp-4"
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHTML(temp.description),
                            }}
                          >
                            {/* {temp.description.length > 100
                              ? temp.description.slice(0, 100) + "..."
                              : temp.description} */}
                          </div>
                        </div>
                        <div className="h-5  flex flex-row-reverse justify-between items-center w-full">
                          <div className="h-5  ">
                            <Button
                              onClick={
                                // handleShareClick
                                () => {
                                  setShowModal((prev) => !prev);
                                }
                              }
                              variant={"ghost"}
                              className="h-5 px-1 py-2 flex items-center gap-1 top-0  text-gray-600 text-xs font-light leading-tight"
                            >
                              <Share2 width={16} h={16} className="shrink-0" />
                              Share
                            </Button>
                          </div>
                          <Sheet open={showModal}>
                            <SheetContent side={"bottom"}>
                              <div className="max-w-md mx-auto">
                                <ShareSocial
                                  style={{
                                    copyContainer: { display: "none" },
                                    root: {
                                      display: "flex",
                                      justifyContent: "center",
                                    },
                                  }}
                                  url={window.location.href}
                                  socialTypes={[
                                    "whatsapp",
                                    "facebook",
                                    "twitter",
                                    "reddit",
                                    "linkedin",
                                  ]}
                                  onSocialButtonClicked={() => {
                                    setShowModal((prev) => !prev);
                                  }}
                                />
                                <Button
                                  variant={"ghost"}
                                  className="w-full border border-gray-300"
                                  onClick={() => setShowModal(false)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </SheetContent>
                          </Sheet>
                          <div className="h-5  text-orange-600 text-sm font-medium leading-[14px]">
                            {temp.preference_category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Slider>
        </div>

        <div className=" flex-col justify-start items-start gap-1.5 inline-flex w-full">
          <div className="text-slate-900 text-sm font-medium leading-normal">
            Subscribe to Newsletter
          </div>

          <Input
            placeholder="Enter your email address"
            className="w-full"
            onChange={subscribeEmailHandler}
          />
          <Button
            className="w-full mt-4"
            onClick={handleNewsletterSubscribe}
            disabled={isSubscribed && true}
          >
            {isSubscribed ? "Subscribed" : "Subscribe Now"}
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="w-full flex flex-col gap-8  relative bg-gray-50 px-5">
          <div className=" mt-[50px] flex-col justify-start items-start gap-3 inline-flex">
            {/* <Openhire className="w-[124.6px] h-[28px]" /> */}
            {/* <div className="text-indigo-700 text-2xl font-bold">DEI Jobs</div> */}
            <img src={companyLogo} className="w-40" alt="DEI jobs logo" />
            <div className=" text-defaultSlate-500 text-sm font-light leading-normal">
              Bridging the gap between D&I job seekers and elite organisations.
              Opening doors to exceptional career opportunities.
            </div>
          </div>
          {/* <div className=" flex-col justify-start items-start gap-5 inline-flex">
            <div className="text-justify text-gray-900 text-xl font-normal leading-7">
              Services
            </div>
            <div className="flex-col justify-start items-start gap-5 flex">
              <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                Track Progress
              </div>
              <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                Insights
              </div>
              <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                Diversity Criteria
              </div>
              <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                Host A Resume
              </div>
            </div>
          </div> */}
          <div className="flex gap-[80px] ">
            <div className="  flex-col justify-start items-start gap-5 inline-flex">
              <div className="text-justify text-gray-900 text-xl font-normal leading-7">
                Resources
              </div>
              <div className="flex-col justify-start items-start gap-5 flex">
                <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                  <a
                    href="https://deijobs.in/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blog
                  </a>
                </div>
                <div
                  className="text-justify text-gray-500 text-sm font-light leading-normal cursor-pointer"
                  onClick={() => navigate("/faq")}
                >
                  FAQ’s
                </div>
                {/* <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                  Pricing
                </div>
                <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                  FAQ’s
                </div>
                <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                  Events
                </div>
                <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                  Newsletter
                </div> */}
              </div>
            </div>
            <div className="  flex-col justify-start items-start gap-5 inline-flex">
              <div className="text-justify text-gray-900 text-xl font-normal leading-7">
                Follow Us
              </div>
              <div className="flex-col justify-start items-start gap-5 flex">
                <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                  <a
                    href="https://www.linkedin.com/company/deijobsin/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                  <a
                    href="https://www.instagram.com/deijobs.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </div>
                {/* <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                  Twitter/X
                </div> */}
                <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                  <a
                    href="https://www.facebook.com/profile.php?id=61552768880052"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </div>
                {/* <div className="text-justify text-gray-500 text-sm font-light leading-normal">
                  YouTube
                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-400"></div>
          <div className="flex-col justify-start items-start gap-5 inline-flex">
            <div
              className="text-justify text-gray-500 text-sm font-light leading-normal cursor-pointer"
              onClick={() => navigate("/privacy_policy")}
            >
              Privacy Policy
            </div>
            <div
              className="text-justify text-gray-500 text-sm font-light leading-normal cursor-pointer"
              onClick={() => navigate("/t&c")}
            >
              Terms & Conditions
            </div>
            <div
              className="text-justify text-gray-500 text-sm font-light leading-normal cursor-pointer"
              onClick={() => navigate("/termsofuse")}
            >
              Terms of Use
            </div>
          </div>
          <div className=" text-justify text-defaultSlate-500 text-xs font-light leading-tight pb-5">
            © DEI Jobs 2023. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

Home.layoutProps = {
  headerProps: {
    routeToGoBack: "hi",
    showShare: "hi",
  },
};

export default Home;
