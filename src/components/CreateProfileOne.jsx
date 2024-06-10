import React from "react";

const CreateProfileOne = () => {
  return (
    <div className="w-[360px] h-[1108px] relative bg-gray-50">
      <div className="w-80 h-[60px] left-[20px] top-[180px] absolute text-gray-500 text-xs font-light leading-tight">
        Please confirm your details once before creating your profile. If you
        wish to change anything, you can edit your profile later too.
      </div>
      <div className="w-[294px] h-7 left-[20px] top-[140px] absolute text-gray-900 text-2xl font-semibold leading-loose">
        Create Your Profile
      </div>
      <div className="w-80 h-[700px] left-[20px] top-[264px] absolute">
        <div className="w-80 h-[70px] left-0 top-0 absolute flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="text-slate-900 text-sm font-medium leading-normal">
            Full Name
          </div>
          <div className="self-stretch justify-start items-start gap-2 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="self-stretch pl-3 pr-14 py-2 bg-white rounded-md border border-slate-300 justify-start items-center inline-flex">
                <div className="text-black text-base font-normal leading-normal">
                  Sameer Malhotra
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-80 h-[70px] left-0 top-[90px] absolute flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="text-slate-900 text-sm font-medium leading-normal">
            Date of Birth
          </div>
          <div className="self-stretch justify-start items-start gap-2 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="self-stretch pl-3 pr-14 py-2 bg-white rounded-md border border-slate-300 justify-start items-center inline-flex">
                <div className="text-black text-base font-normal leading-normal">
                  01 January 1970
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-6 h-6 left-[284px] top-[128px] absolute" />
        <div className="w-80 h-[70px] left-0 top-[180px] absolute flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="text-slate-900 text-sm font-medium leading-normal">
            Email Address
          </div>
          <div className="self-stretch justify-start items-start gap-2 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="self-stretch pl-3 pr-14 py-2 bg-white rounded-md border border-slate-300 justify-start items-center inline-flex">
                <div className="text-black text-base font-normal leading-normal">
                  sameer.malhotra@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-80 h-[70px] left-0 top-[630px] absolute flex-col justify-start items-start gap-1.5 inline-flex">
          <div className="text-slate-900 text-sm font-medium leading-normal">
            Experience
          </div>
          <div className="self-stretch justify-start items-start gap-2 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="self-stretch pl-3 pr-14 py-2 bg-white rounded-md border border-slate-300 justify-start items-center inline-flex">
                <div className="text-black text-base font-normal leading-normal">
                  20 Years
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-80 h-[70px] left-0 top-[270px] absolute">
          <div className="w-80 h-10 px-3 py-2 left-0 top-[30px] absolute bg-white rounded-md border border-gray-300 justify-start items-center gap-2.5 inline-flex">
            <div className="grow shrink basis-0 text-gray-400 text-sm font-light leading-normal">
              Select an option
            </div>
            <div className="w-4 h-4 relative" />
          </div>
          <div className="left-0 top-0 absolute text-slate-900 text-sm font-medium leading-normal">
            Category
          </div>
        </div>
        <div className="w-80 h-[70px] left-0 top-[450px] absolute">
          <div className="w-80 h-10 px-3 py-2 left-0 top-[30px] absolute bg-white rounded-md border border-gray-300 justify-start items-center gap-2.5 inline-flex">
            <div className="grow shrink basis-0 text-gray-400 text-sm font-light leading-normal">
              Select how can you be addressed
            </div>
            <div className="w-4 h-4 relative" />
          </div>
          <div className="left-0 top-0 absolute text-slate-900 text-sm font-medium leading-normal">
            Pronoun
          </div>
        </div>
        <div className="w-80 h-[70px] left-0 top-[360px] absolute">
          <div className="w-80 h-10 px-3 py-2 left-0 top-[30px] absolute bg-white rounded-md border border-gray-300 justify-start items-center gap-2.5 inline-flex">
            <div className="grow shrink basis-0 text-black text-base font-normal leading-normal">
              Male
            </div>
            <div className="w-4 h-4 relative" />
          </div>
          <div className="left-0 top-0 absolute text-slate-900 text-sm font-medium leading-normal">
            Gender
          </div>
        </div>
        <div className="w-80 h-[70px] left-0 top-[540px] absolute">
          <div className="w-80 h-10 px-3 py-2 left-0 top-[30px] absolute bg-white rounded-md border border-gray-300 justify-start items-center gap-2.5 inline-flex">
            <div className="grow shrink basis-0 text-black text-base font-normal leading-normal">
              Bank Manager
            </div>
            <div className="w-4 h-4 relative" />
          </div>
          <div className="left-0 top-0 absolute text-slate-900 text-sm font-medium leading-normal">
            Job Role
          </div>
        </div>
      </div>
      <div className="w-80 px-4 py-3 left-[20px] top-[1016px] absolute bg-slate-700 rounded-md justify-center items-center gap-2.5 inline-flex">
        <div className="text-white text-sm font-medium leading-normal">
          Save and Continue
        </div>
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
      </div>
    </div>
  );
};

export default CreateProfileOne;
