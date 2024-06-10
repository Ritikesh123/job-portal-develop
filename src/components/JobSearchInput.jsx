import React from "react";

const JobSearchInput = () => {
  return (
    <div className="w-[360px] h-[800px] relative bg-gray-50">
      <div className="w-80 h-10 left-[20px] top-[125px] absolute justify-center items-center inline-flex">
        <div className="w-80 flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="self-stretch justify-start items-start gap-2 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="self-stretch pl-3 pr-14 py-2 bg-white rounded-md border border-slate-300 justify-start items-center inline-flex">
                <div className="justify-start items-center gap-3 flex">
                  <div className="w-5 h-5 relative" />
                  <div className="text-gray-900 text-base font-normal leading-normal">
                    Bank Manager
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-80 left-[20px] top-[192px] absolute justify-center items-center inline-flex">
        <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="self-stretch justify-start items-start gap-2 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="self-stretch pl-3 pr-14 py-2 bg-white rounded-md border border-slate-300 justify-start items-center inline-flex">
                <div className="justify-start items-center gap-3 flex">
                  <div className="w-5 h-5 relative" />
                  <div className="text-gray-900 text-base font-normal leading-normal">
                    Mumbai
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[420px] left-[20px] top-[268px] absolute">
        <div className="w-[316px] h-5 left-0 top-0 absolute text-gray-600 text-base font-medium leading-normal">
          4 Jobs Available
        </div>
        <div className="w-80 h-[84px] left-0 top-[36px] absolute">
          <div className="w-80 h-[84px] p-5 left-0 top-0 absolute bg-white rounded-[11px] shadow flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-11 h-11 left-[20px] top-[20px] absolute rounded-lg"
            src="https://via.placeholder.com/44x44"
          />
          <div className="w-[197px] h-4 left-[76px] top-[46px] absolute text-gray-500 text-xs font-light leading-tight">
            Full-time • Axis Bank • Mumbai
          </div>
          <div className="w-40 h-5 left-[76px] top-[22px] absolute text-gray-900 text-sm font-light leading-normal">
            Bank Manager
          </div>
          <div className="w-4 h-4 left-[284px] top-[34px] absolute" />
        </div>
        <div className="w-80 h-[84px] left-0 top-[136px] absolute">
          <div className="w-80 h-[84px] p-5 left-0 top-0 absolute bg-white rounded-[11px] shadow flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-11 h-11 left-[20px] top-[20px] absolute rounded-lg"
            src="https://via.placeholder.com/44x44"
          />
          <div className="w-[197px] h-4 left-[76px] top-[46px] absolute text-gray-500 text-xs font-light leading-tight">
            Full-time • HDFC Bank • Mumbai
          </div>
          <div className="w-[200px] h-5 left-[76px] top-[22px] absolute text-gray-900 text-sm font-light leading-normal">
            Bank Manager
          </div>
          <div className="w-4 h-4 left-[284px] top-[34px] absolute" />
        </div>
        <div className="w-80 h-[84px] left-0 top-[236px] absolute">
          <div className="w-80 h-[84px] p-5 left-0 top-0 absolute bg-white rounded-[11px] shadow flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-11 h-11 left-[20px] top-[20px] absolute rounded-lg"
            src="https://via.placeholder.com/44x44"
          />
          <div className="w-[197px] h-4 left-[76px] top-[46px] absolute text-gray-500 text-xs font-light leading-tight">
            Remote • SBI • Mumbai
          </div>
          <div className="w-[195px] h-5 left-[76px] top-[22px] absolute text-gray-900 text-sm font-light leading-normal">
            Bank Manager
          </div>
          <div className="w-4 h-4 left-[284px] top-[34px] absolute" />
        </div>
        <div className="w-80 h-[84px] left-0 top-[336px] absolute">
          <div className="w-80 h-[84px] p-5 left-0 top-0 absolute bg-white rounded-[11px] shadow flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-11 h-11 left-[20px] top-[20px] absolute rounded-lg"
            src="https://via.placeholder.com/44x44"
          />
          <div className="w-[197px] h-4 left-[76px] top-[46px] absolute text-gray-500 text-xs font-light leading-tight">
            Part-time • Kotak Bank • Mumbai
          </div>
          <div className="w-[200px] h-5 left-[76px] top-[22px] absolute text-gray-900 text-sm font-light leading-normal">
            Bank Manager
          </div>
          <div className="w-4 h-4 left-[284px] top-[34px] absolute" />
        </div>
      </div>
      <div className="w-[360px] h-[116px] left-0 top-0 absolute">
        <div className="w-[360px] h-[116px] left-0 top-0 absolute bg-white shadow" />
        <div className="w-16 h-5 left-[276px] top-[74px] absolute">
          <div className="w-5 h-5 left-0 top-0 absolute flex-col justify-start items-start inline-flex" />
          <div className="w-9 h-5 left-[28px] top-0 absolute text-center text-slate-700 text-xs font-light leading-tight">
            Filters
          </div>
        </div>
        <div className="w-6 h-6 left-[20px] top-[72px] absolute" />
        <div className="w-[156px] h-8 pl-6 pr-[24.82px] py-1 left-[102px] top-[68px] absolute justify-center items-center inline-flex" />
        <div className="w-[360px] h-[52px] px-6 py-2.5 left-0 top-0 absolute justify-between items-end gap-[286px] inline-flex">
          <div className="text-slate-800 text-sm font-medium leading-tight tracking-tight">
            9:30
          </div>
          <div className="w-[46px] h-[17px] relative">
            <div className="w-[17px] h-[17px] left-0 top-0 absolute">
              <div className="w-[17px] h-[17px] left-0 top-0 absolute" />
            </div>
            <div className="w-[17px] h-[17px] left-[16px] top-0 absolute"></div>
            <div className="w-2 h-[15px] left-[38px] top-[1px] absolute" />
          </div>
        </div>
      </div>
      <div className="w-[360px] h-20 pl-px left-0 top-[720px] absolute bg-white border-t border-gray-300 justify-center items-start gap-[45px] inline-flex">
        <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
          <div className="grow shrink basis-0 self-stretch pt-3 pb-[18px] flex-col justify-start items-center gap-1 inline-flex">
            <div className="w-8 h-8 relative flex-col justify-start items-start flex" />
            <div className="self-stretch text-center text-slate-700 text-[10px] font-normal leading-[14px]">
              Jobs
            </div>
          </div>
        </div>
        <div className="grow shrink basis-0 self-stretch pt-3 pb-[18px] flex-col justify-start items-center gap-1 inline-flex">
          <div className="w-8 h-8 relative flex-col justify-start items-start flex" />
          <div className="self-stretch text-center text-gray-600 text-[10px] font-normal leading-[14px]">
            Profile
          </div>
        </div>
        <div className="grow shrink basis-0 self-stretch justify-center items-center inline-flex">
          <div className="grow shrink basis-0 self-stretch pt-3 pb-[18px] flex-col justify-start items-center gap-1 inline-flex">
            <div className="w-8 h-8 relative flex-col justify-start items-start flex" />
            <div className="self-stretch text-center text-gray-600 text-[10px] font-normal leading-[14px]">
              More
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchInput;
