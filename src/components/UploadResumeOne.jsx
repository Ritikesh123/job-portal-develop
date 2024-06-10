import React from "react";

const UploadResumeOne = () => {
  return (
    <div className="w-[360px] h-[800px] relative bg-gray-50">
      <div className="w-80 h-[60px] left-[20px] top-[180px] absolute text-gray-500 text-xs font-light leading-tight">
        Upload your resume to automatically fill-in your
        <br />
        profile details. This will save your time and
        <br />
        get you started super-fast
      </div>
      <div className="w-80 px-4 py-3 left-[20px] top-[708px] absolute bg-white rounded-md border border-slate-700 justify-center items-center gap-2.5 inline-flex">
        <div className="text-slate-700 text-sm font-medium leading-normal">
          Skip & Add Details Manually
        </div>
      </div>
      <div className="w-[294px] h-7 left-[20px] top-[140px] absolute text-gray-900 text-2xl font-semibold leading-loose">
        Upload Your Resume
      </div>
      <div className="w-80 h-72 left-[20px] top-[264px] absolute">
        <div className="w-80 h-72 p-5 left-0 top-0 absolute bg-white rounded-xl shadow flex-col justify-start items-start gap-5 inline-flex">
          <div className="self-stretch grow shrink basis-0" />
        </div>
        <div className="w-[280px] h-[248px] left-[20px] top-[20px] absolute bg-slate-50 rounded-lg border border-slate-400" />
        <div className="w-60 h-5 left-[40px] top-[132px] absolute text-center text-gray-600 text-sm font-medium leading-[14px]">
          Supported File Formats
        </div>
        <div className="w-60 h-5 left-[40px] top-[152px] absolute text-center text-gray-600 text-xs font-light leading-tight">
          (.pdf, .docx, .doc, .txt)
        </div>
        <div className="w-[72px] h-[72px] left-[124px] top-[48px] absolute" />
        <div className="w-60 h-12 px-4 py-3 left-[40px] top-[200px] absolute bg-slate-700 rounded-md justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-sm font-medium leading-normal">
            Upload Resume
          </div>
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

export default UploadResumeOne;
