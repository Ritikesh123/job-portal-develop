import React from "react";

export default function TopCompaniesCard({ company, onClick }) {
  return (
    <div
      className="h-[84px] w-[11.5rem] mr-4 cursor-pointer mb-2"
      onClick={() => onClick()}
    >
      <div className=" h-[84px] p-5  bg-white rounded-xl border-gray-200 shadow-md items-center gap-2 flex">
        <img
          className="w-11 h-11   rounded-lg object-contain"
          src={company.company_logo}
        />
        <div className="  text-gray-900 text-sm font-medium leading-tight overflow-hidden whitespace-nowrap text-ellipsis">
          {company.company_name}
        </div>
      </div>
    </div>
  );
}
