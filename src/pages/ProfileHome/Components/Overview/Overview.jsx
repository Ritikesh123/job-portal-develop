import React, { useEffect, useState } from "react";
import { ReactComponent as Quotes } from "@/assets/img/icons/quotes.svg";
import useGetOverview from "./hooks/useGetOverview";
import defaultlogo from "@/assets/img/icons/company_default_logo.jpg";
export function calculateYearsMonths(startDate, endDate) {
  const start = new Date(startDate);
  let end = new Date();

  if (endDate) {
    end = new Date(endDate);
  }

  let years = end?.getFullYear() - start?.getFullYear();
  const startMonth = start?.getMonth();
  const endMonth = end?.getMonth();

  let months = endMonth - startMonth;

  if (months < 0) {
    years--;
    months += 12;
  }

  if (end?.getDate() < start?.getDate()) {
    months--;
  }

  if (months < 0) {
    months += 12;
  }

  return { years, months };
}
export default function Overview() {
  const [studentProfile, setStudentProfile] = useState(null);
  const newData = {
    userId: JSON.parse(localStorage.getItem("login_token")),
  };
  const { data } = useGetOverview(newData);
  const preferred_job_type = (
    data?.data?.user_data[0]?.preferred_job_type || ""
  ).split(",");

  return (
    <div className="mb-5">
      <div className="w-full rounded-md justify-end items-center gap-2.5 inline-flex relative">
        <div className="text-indigo-700 text-sm font-medium font-['Lexend'] underline leading-normal">
          <a
            href={data?.data.user_data[0]?.candidate_resume}
            target="_blank"
            rel="noopener noreferrer"
            download={data?.data.user_data[0]?.name}
            className="cursor-pointer"
          >
            Download Resume{" "}
          </a>
        </div>
      </div>
      <div className="flex justify-between items-center gap-5 my-7 pr-10">
        <div className=" rounded-bl-md rounded-br-md flex-col justify-center items-center inline-flex">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={data?.data?.user_data[0]?.candidate_profile_picture}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-black text-sm font-medium font-['Lexend'] leading-normal">
            {data?.data?.user_data[0]?.name}
          </div>
          <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal">
            {data?.data?.user_data[0]?.experience} Years of exp
            {data?.data?.user_data[0]?.location && (
              <>, {data?.data?.user_data[0]?.location}</>
            )}{" "}
            <br />
            {/* India, Open to remote */}
          </div>
        </div>
      </div>
      {data?.data?.user_data[0]?.bio && (
        <>
          <div className="text-black text-sm font-normal font-['Lexend'] leading-tight">
            Looking For
          </div>
          <div className="flex gap-5 my-5">
            <Quotes height={30} width={70} />
            <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal">
              {data?.data?.user_data[0]?.bio}
            </div>
          </div>
        </>
      )}
      {data?.data?.work_experience.length > 0 && (
        <>
          <div className="text-black text-sm font-normal font-['Lexend'] leading-tight mb-5">
            Experience
          </div>
          {data?.data?.work_experience?.map((item) => (
            <>
              <div className="flex gap-10 justify-between mb-5" key={item?.id}>
                <img
                  className="w-11 h-11 rounded-lg"
                  src={item?.employer_logo ?? defaultlogo}
                />
                <div className="flex flex-col flex-grow ">
                  <div className="text-black text-sm font-medium font-['Lexend'] leading-normal">
                    {item?.company_name}
                  </div>
                  <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal">
                    {item?.role_name}
                  </div>
                  <div className="flex gap-3">
                    <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal">
                      {item?.start_date} to{" "}
                      {item?.end_date != null ? item?.end_date : "Present"}
                    </div>
                    <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal">
                      {calculateYearsMonths(item?.start_date, item?.end_date)
                        .years >= 1
                        ? calculateYearsMonths(item?.start_date, item?.end_date)
                            .years + " year"
                        : (calculateYearsMonths(
                            item?.start_date,
                            item?.end_date
                          ).months != 0
                            ? calculateYearsMonths(
                                item?.start_date,
                                item?.end_date
                              ).months
                            : 1) + " month"}
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal pt-7">
                    {item?.description}
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      )}
      {data?.data?.education_data.length > 0 && (
        <>
          <div className="text-black text-sm font-normal font-['Lexend'] leading-tight mb-5">
            Education
          </div>
          {data?.data?.education_data?.map((item) => (
            <div>
              <div className="text-gray-700 text-sm font-light font-['Lexend'] leading-normal mb-5">
                {item?.description}
              </div>
              <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal mb-5">
                {item?.degree}. {item?.university} •{" "}
                {item?.passing_year?.split("-")[0]}
              </div>
            </div>
          ))}
        </>
      )}
      {data?.data?.user_data[0]?.skill && (
        <>
          <div className="text-black text-sm font-normal font-['Lexend'] leading-tight  mb-5">
            Skills
          </div>
          <div className="mb-5 flex gap-2 flex-wrap">
            {data?.data?.user_data[0]?.skill?.split(",").map((item, key) => (
              <div
                key={key}
                className=" bg-gray-100 py-1 px-1.5 rounded inline-block"
              >
                <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal ">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="text-black text-sm font-normal font-['Lexend'] leading-tight mb-5">
        Ideal next opportunity
      </div>
      <div className="flex flex-col gap-4">
        {data?.data?.user_data[0]?.desired_salary && (
          <div>
            <div className="text-gray-700 text-sm font-light font-['Lexend'] leading-normal">
              Desired Salary
            </div>
            <div className=" bg-gray-100 py-1 px-1.5 rounded inline-block">
              <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal ">
                ₹{data?.data?.user_data[0]?.desired_salary}
              </div>
            </div>
          </div>
        )}
        {data?.data?.user_data[0]?.job_role && (
          <div>
            <div className="text-gray-700 text-sm font-light font-['Lexend'] leading-normal">
              Desired Role
            </div>
            <div className=" bg-gray-100 py-1 px-1.5 rounded inline-block">
              <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal ">
                {data?.data?.user_data[0]?.job_role}
              </div>
            </div>
          </div>
        )}
        {preferred_job_type.length > 0 && preferred_job_type[0] != "" && (
          <div>
            <div className="text-gray-700 text-sm font-light font-['Lexend'] leading-normal">
              Remote Work
            </div>
            <div>
              {preferred_job_type.map((item) => (
                <div className=" bg-gray-100 py-1 px-1.5 rounded inline-block">
                  <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal ">
                    {item}
                  </div>
                </div>
              ))}
              {/* <div className="text-gray-700 text-xs font-light font-['Lexend'] leading-tight">
              Prefers remote work, but is open to work onsite
            </div> */}
            </div>
          </div>
        )}
        {data?.data?.user_data[0]?.preferred_location && (
          <div>
            <div className="text-gray-700 text-sm font-light font-['Lexend'] leading-normal">
              Desired Location
            </div>
            <div className=" flex gap-2 flex-wrap">
              {/* What location do you want to work in? */}
              <div className=" bg-gray-100 py-1 px-1.5 rounded inline-block">
                <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal ">
                  {data?.data?.user_data[0]?.preferred_location}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <div>
          <div className="text-gray-700 text-sm font-light font-['Lexend'] leading-normal">
            Desired Company Focus
          </div>
          <div className=" flex gap-2 flex-wrap">
            {[1].map((item, key) => (
              <div
                key={key}
                className=" bg-gray-100 py-1 px-1.5 rounded inline-block"
              >
                <div className="text-gray-500 text-sm font-light font-['Lexend'] leading-normal ">
                  liquip
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
