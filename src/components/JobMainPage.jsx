import React from "react";

const JobMainPage = () => {
  return (
    <div className="w-[360px] h-[1602px] relative bg-gray-50">
      <div className="w-80 h-[120px] left-[20px] top-[216px] absolute">
        <div className="w-[316px] h-5 left-0 top-0 absolute text-gray-600 text-base font-medium leading-normal">
          Overview
        </div>
        <div className="w-[150px] h-[84px] left-0 top-[36px] absolute">
          <div className="w-[150px] h-[84px] p-5 left-0 top-0 absolute bg-white rounded-xl shadow border-gray-200 flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <div className="w-5 h-5 left-[114px] top-[48px] absolute" />
          <div className="w-6 h-5 left-[16px] top-[16px] absolute text-gray-900 text-xl font-semibold leading-7">
            20
          </div>
          <div className="left-[16px] top-[48px] absolute text-gray-600 text-sm font-normal leading-tight">
            Saved
          </div>
        </div>
        <div className="w-[150px] h-[84px] left-[170px] top-[36px] absolute">
          <div className="w-[150px] h-[84px] p-5 left-0 top-0 absolute bg-white rounded-xl shadow border-gray-200 flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <div className="w-5 h-5 left-[114px] top-[48px] absolute" />
          <div className="w-6 h-5 left-[16px] top-[16px] absolute text-slate-700 text-xl font-semibold leading-7">
            07
          </div>
          <div className="left-[16px] top-[48px] absolute text-gray-600 text-sm font-normal leading-tight">
            Applied
          </div>
        </div>
      </div>
      <div className="w-80 h-[132px] left-[20px] top-[620px] absolute">
        <div className="w-[316px] h-5 left-0 top-0 absolute text-gray-600 text-base font-medium leading-normal">
          Search by Job Type
        </div>
        <div className="w-24 h-24 left-0 top-[36px] absolute">
          <div className="w-24 h-24 p-5 left-0 top-0 absolute bg-white rounded-xl shadow border-gray-200 flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-8 h-8 left-[32px] top-[20px] absolute"
            src="https://via.placeholder.com/32x32"
          />
          <div className="w-14 h-4 left-[20px] top-[60px] absolute text-center text-gray-600 text-xs font-light leading-tight">
            Fulltime
          </div>
        </div>
        <div className="w-24 h-24 left-[112px] top-[36px] absolute">
          <div className="w-24 h-24 p-5 left-0 top-0 absolute bg-white rounded-xl shadow border-gray-200 flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-8 h-8 left-[32px] top-[20px] absolute"
            src="https://via.placeholder.com/32x32"
          />
          <div className="w-14 h-4 left-[20px] top-[60px] absolute text-center text-gray-600 text-xs font-light leading-tight">
            Part-time
          </div>
        </div>
        <div className="w-24 h-24 left-[224px] top-[36px] absolute">
          <div className="w-24 h-24 p-5 left-0 top-0 absolute bg-white rounded-xl shadow border-gray-200 flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-8 h-8 left-[32px] top-[20px] absolute"
            src="https://via.placeholder.com/32x32"
          />
          <div className="w-[58px] h-4 left-[19px] top-[60px] absolute text-center text-gray-600 text-xs font-light leading-tight">
            Internship
          </div>
        </div>
      </div>
      <div className="w-[360px] h-52 left-0 top-[376px] absolute">
        <div className="w-10 h-1.5 left-[159px] top-[202px] absolute">
          <div className="w-1.5 h-1.5 left-[20px] top-0 absolute bg-slate-300 rounded-full" />
          <div className="w-1.5 h-1.5 left-[34px] top-0 absolute bg-slate-300 rounded-full" />
          <div className="w-3 h-1.5 left-0 top-0 absolute bg-gray-900 rounded-[50px]" />
        </div>
        <div className="w-[360px] h-[150px] pl-5 left-0 top-[36px] absolute justify-end items-start gap-4 inline-flex">
          <div className="w-[280px] h-[150px] relative">
            <div className="w-[280px] h-[150px] p-5 left-0 top-0 absolute bg-white rounded-xl shadow flex-col justify-start items-start gap-5 inline-flex">
              <div className="self-stretch grow shrink basis-0" />
            </div>
            <div className="w-[74px] h-4 left-[186px] top-[114px] absolute">
              <div className="w-[58px] h-4 left-0 top-0 absolute text-right text-white text-sm font-normal leading-tight">
                Show All
              </div>
              <div className="w-4 h-4 left-[58px] top-0 absolute flex-col justify-start items-start inline-flex" />
            </div>
            <div className="w-[82px] h-4 left-[47px] top-[114px] absolute text-gray-800 text-xs font-light leading-tight">
              Jobs Available
            </div>
            <div className="w-[197px] h-4 left-[68px] top-[44px] absolute text-gray-500 text-xs font-light leading-tight">
              Branch Manager
            </div>
            <div className="w-40 h-5 left-[68px] top-[16px] absolute text-black text-base font-medium leading-normal">
              Axis Bank
            </div>
            <div className="w-[23px] h-[22px] left-[20px] top-[108px] absolute text-gray-700 text-xl font-normal leading-7">
              24
            </div>
            <img
              className="w-11 h-11 left-[16px] top-[16px] absolute rounded-lg"
              src="https://via.placeholder.com/44x44"
            />
          </div>
          <div className="w-[280px] h-[150px] relative">
            <div className="w-[280px] h-[150px] p-5 left-0 top-0 absolute bg-slate-700 rounded-xl shadow flex-col justify-start items-start gap-5 inline-flex">
              <div className="self-stretch grow shrink basis-0" />
            </div>
            <div className="w-[74px] h-4 left-[186px] top-[114px] absolute">
              <div className="w-[58px] h-4 left-0 top-0 absolute text-right text-white text-sm font-normal leading-tight">
                Show All
              </div>
              <div className="w-4 h-4 left-[58px] top-0 absolute flex-col justify-start items-start inline-flex" />
            </div>
            <div className="w-[82px] h-4 left-[47px] top-[114px] absolute text-slate-200 text-xs font-light leading-tight">
              Jobs Available
            </div>
            <div className="w-[197px] h-4 left-[20px] top-[48px] absolute text-slate-50 text-xs font-light leading-tight">
              HDFC, SBI, BOI, and 3 more banks
            </div>
            <div className="w-40 h-5 left-[20px] top-[20px] absolute text-white text-base font-medium leading-normal">
              Accountant
            </div>
            <div className="w-[23px] h-[22px] left-[20px] top-[108px] absolute text-white text-xl font-normal leading-7">
              24
            </div>
          </div>
          <div className="w-[280px] h-[150px] relative">
            <div className="w-[280px] h-[150px] p-5 left-0 top-0 absolute bg-slate-700 rounded-xl shadow flex-col justify-start items-start gap-5 inline-flex">
              <div className="self-stretch grow shrink basis-0" />
            </div>
            <div className="w-[74px] h-4 left-[186px] top-[114px] absolute">
              <div className="w-[58px] h-4 left-0 top-0 absolute text-right text-white text-sm font-normal leading-tight">
                Show All
              </div>
              <div className="w-4 h-4 left-[58px] top-0 absolute flex-col justify-start items-start inline-flex" />
            </div>
            <div className="w-[82px] h-4 left-[47px] top-[114px] absolute text-slate-200 text-xs font-light leading-tight">
              Jobs Available
            </div>
            <div className="w-[197px] h-4 left-[20px] top-[48px] absolute text-slate-50 text-xs font-light leading-tight">
              HDFC, SBI, BOI, and 3 more banks
            </div>
            <div className="w-40 h-5 left-[20px] top-[20px] absolute text-white text-base font-medium leading-normal">
              Bank Manager
            </div>
            <div className="w-[23px] h-[22px] left-[20px] top-[108px] absolute text-white text-xl font-normal leading-7">
              24
            </div>
          </div>
        </div>
        <div className="w-[316px] h-5 left-[20px] top-0 absolute text-gray-600 text-base font-medium leading-normal">
          Recommended jobs
        </div>
      </div>
      <div className="w-80 h-10 left-[20px] top-[140px] absolute justify-center items-center inline-flex">
        <div className="w-80 flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="self-stretch justify-start items-start gap-2 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="self-stretch pl-3 pr-14 py-2 bg-white rounded-md border border-slate-300 justify-start items-center inline-flex">
                <div className="justify-start items-center gap-3 flex">
                  <div className="w-5 h-5 relative" />
                  <div className="text-gray-400 text-base font-normal leading-normal">
                    Search Jobs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-80 h-[420px] left-[20px] top-[966px] absolute">
        <div className="w-[316px] h-5 left-0 top-0 absolute text-gray-600 text-base font-medium leading-normal">
          New Hiring
        </div>
        <div className="w-[74px] h-4 left-[246px] top-[2px] absolute">
          <div className="w-[58px] h-4 left-0 top-0 absolute text-right text-slate-700 text-sm font-normal leading-tight">
            Show All
          </div>
          <div className="w-4 h-4 left-[58px] top-0 absolute flex-col justify-start items-start inline-flex" />
        </div>
        <div className="w-80 h-[84px] left-0 top-[36px] absolute">
          <div className="w-80 h-[84px] p-5 left-0 top-0 absolute bg-white rounded-[11px] shadow flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-11 h-11 left-[20px] top-[20px] absolute"
            src="https://via.placeholder.com/44x44"
          />
          <div className="w-[197px] h-4 left-[76px] top-[46px] absolute text-gray-500 text-xs font-light leading-tight">
            Fulltime • Apple • Mumbai
          </div>
          <div className="w-40 h-5 left-[76px] top-[22px] absolute text-gray-900 text-sm font-light leading-normal">
            Product Designer
          </div>
          <div className="w-4 h-4 left-[284px] top-[34px] absolute" />
        </div>
        <div className="w-80 h-[84px] left-0 top-[136px] absolute">
          <div className="w-80 h-[84px] p-5 left-0 top-0 absolute bg-white rounded-[11px] shadow flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-11 h-11 left-[20px] top-[20px] absolute"
            src="https://via.placeholder.com/44x44"
          />
          <div className="w-[197px] h-4 left-[76px] top-[46px] absolute text-gray-500 text-xs font-light leading-tight">
            Part-time • Nike • Gurugram
          </div>
          <div className="w-[200px] h-5 left-[76px] top-[22px] absolute text-gray-900 text-sm font-light leading-normal">
            Marketing Executive
          </div>
          <div className="w-4 h-4 left-[284px] top-[34px] absolute" />
        </div>
        <div className="w-80 h-[84px] left-0 top-[236px] absolute">
          <div className="w-80 h-[84px] p-5 left-0 top-0 absolute bg-white rounded-[11px] shadow flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-11 h-11 left-[20px] top-[20px] absolute"
            src="https://via.placeholder.com/44x44"
          />
          <div className="w-[197px] h-4 left-[76px] top-[46px] absolute text-gray-500 text-xs font-light leading-tight">
            Internship • Google • Hyderbad
          </div>
          <div className="w-[195px] h-5 left-[76px] top-[22px] absolute text-gray-900 text-sm font-light leading-normal">
            Product Internship
          </div>
          <div className="w-4 h-4 left-[284px] top-[34px] absolute" />
        </div>
        <div className="w-80 h-[84px] left-0 top-[336px] absolute">
          <div className="w-80 h-[84px] p-5 left-0 top-0 absolute bg-white rounded-[11px] shadow flex-col justify-start items-start gap-5 inline-flex">
            <div className="self-stretch grow shrink basis-0" />
          </div>
          <img
            className="w-11 h-11 left-[20px] top-[20px] absolute"
            src="https://via.placeholder.com/44x44"
          />
          <div className="w-[197px] h-4 left-[76px] top-[46px] absolute text-gray-500 text-xs font-light leading-tight">
            Fulltime • Tata • Bengaluru
          </div>
          <div className="w-[200px] h-5 left-[76px] top-[22px] absolute text-gray-900 text-sm font-light leading-normal">
            Business Manager{" "}
          </div>
          <div className="w-4 h-4 left-[284px] top-[34px] absolute" />
        </div>
      </div>
      <div className="w-[360px] h-[120px] left-0 top-[788px] absolute">
        <div className="w-[316px] h-5 left-[20px] top-0 absolute text-gray-600 text-base font-medium leading-normal">
          Top Companies
        </div>
        <div className="w-[360px] h-[84px] pl-5 left-0 top-[36px] absolute justify-end items-start gap-4 inline-flex">
          <div className="w-[200px] h-[84px] relative">
            <div className="w-[200px] h-[84px] p-5 left-0 top-0 absolute bg-white rounded-xl shadow border-gray-200 flex-col justify-start items-start gap-5 inline-flex">
              <div className="self-stretch grow shrink basis-0" />
            </div>
            <div className="w-[104px] h-[42px] left-[76px] top-[20px] absolute text-gray-900 text-sm font-medium leading-tight">
              Axis Bank
            </div>
            <img
              className="w-11 h-11 left-[20px] top-[20px] absolute rounded-lg"
              src="https://via.placeholder.com/44x44"
            />
          </div>
          <div className="w-[200px] h-[84px] relative">
            <div className="w-[200px] h-[84px] p-5 left-0 top-0 absolute bg-white rounded-xl shadow border-gray-200 flex-col justify-start items-start gap-5 inline-flex">
              <div className="self-stretch grow shrink basis-0" />
            </div>
            <div className="w-[104px] h-[42px] left-[76px] top-[20px] absolute text-gray-900 text-sm font-medium leading-tight">
              Google
            </div>
            <img
              className="w-11 h-11 left-[20px] top-[20px] absolute"
              src="https://via.placeholder.com/44x44"
            />
          </div>
        </div>
      </div>
      <div className="w-10 h-1.5 left-[160px] top-[924px] absolute">
        <div className="w-1.5 h-1.5 left-[20px] top-0 absolute bg-slate-300 rounded-full" />
        <div className="w-1.5 h-1.5 left-[34px] top-0 absolute bg-slate-300 rounded-full" />
        <div className="w-3 h-1.5 left-0 top-0 absolute bg-gray-900 rounded-[50px]" />
      </div>
      <div className="w-[360px] h-[116px] left-0 top-0 absolute">
        <div className="w-[360px] h-[116px] left-0 top-0 absolute bg-white shadow" />
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
        <div className="w-6 h-6 left-[316px] top-[72px] absolute" />
      </div>
      <div className="w-[360px] h-20 pl-px left-0 top-[1522px] absolute bg-white border-t border-gray-300 justify-center items-start gap-[45px] inline-flex">
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

export default JobMainPage;
