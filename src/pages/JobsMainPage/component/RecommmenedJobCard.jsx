import React from "react";

export default function RecommmenedJobCard({
  applicant_count,
  title,
  role,
  employer_logo,
  onClick,
}) {
  return (
    <div
      className="w-[280px] h-[154px] mr-4 cursor-pointer mb-2"
      onClick={() => onClick()}
    >
      <div className="w-full h-[154px] p-5  bg-white rounded-xl flex-col inline-flex overflow-hidden shadow-md border-gray-200">
        <div className="flex gap-2 ">
          <img
            className="w-11 h-11  rounded-lg object-contain"
            src={employer_logo || "public/company_default_logo.jpg"}
          />
          <div className="flex gap-2 flex-col">
            <div className="w-40 h-5  text-black text-base font-medium leading-normal overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </div>
            <div className=" h-4  text-gray-500 text-xs font-light leading-tight">
              {role}
            </div>
          </div>{" "}
        </div>
        <div className="flex gap-2 items-center mt-14">
          <div className="w-[23px]   text-gray-700 text-xl font-normal leading-7">
            {applicant_count}
          </div>
          <div className=" text-gray-800 text-xs font-light leading-tight">
            Applicants
          </div>
        </div>
        {/* <Link to={"/jobs"}>
          <div className=" h-4 ">
            <div className=" h-4 text-right text-white text-sm font-normal leading-tight">
              Show All
            </div>
          </div>
        </Link> */}
      </div>
    </div>
  );
}
