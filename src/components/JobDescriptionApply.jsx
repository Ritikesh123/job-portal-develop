import React from "react";

const JobDescriptionApply = () => {
  return (
    <div className="w-[360px] h-[800px] relative bg-gray-50">
      <img
        className="w-[360px] h-[800px] left-0 top-0 absolute"
        src="https://via.placeholder.com/360x800"
      />
      <div className="w-[360px] h-[800px] left-0 top-0 absolute bg-black bg-opacity-80" />
      <div className="w-[360px] h-[429px] left-0 top-[371px] absolute bg-gray-50 rounded-tl-3xl rounded-tr-3xl">
        <div className="w-80 px-4 py-3 left-[20px] top-[285px] absolute bg-slate-700 rounded-md justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-sm font-medium leading-normal">
            Take me there
          </div>
        </div>
        <div className="w-[73px] px-4 py-3 left-[144px] top-[345px] absolute bg-white bg-opacity-0 rounded-md justify-center items-center gap-2.5 inline-flex">
          <div className="text-slate-900 text-sm font-medium leading-normal">
            Cancel
          </div>
        </div>
        <div className="w-[313px] h-11 left-[20px] top-[205px] absolute text-gray-900 text-sm font-light leading-normal">
          You will be redirected to the company’s job portal to apply
        </div>
        <img
          className="w-20 h-20 left-[20px] top-[33px] absolute rounded-[150px]"
          src="https://via.placeholder.com/80x80"
        />
        <div className="w-[198px] h-6 left-[20px] top-[133px] absolute text-gray-900 text-xl font-semibold leading-7">
          Bank Manager
        </div>
        <div className="w-[280px] h-5 left-[20px] top-[165px] absolute text-gray-500 text-sm font-normal leading-tight">
          Axis Bank • Full-time • Mumbai
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionApply;
