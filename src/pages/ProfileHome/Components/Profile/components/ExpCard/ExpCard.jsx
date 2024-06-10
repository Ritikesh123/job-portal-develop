import { ReactComponent as Edit } from "@/assets/img/icons/Edit.svg";
import defaultlogo from "@/assets/img/icons/company_default_logo.jpg";
import deleteIcon from "@/assets/img/icons/delete.svg";
import { deleteCards } from "../../Profile";
import { calculateYearsMonths } from "../../../Overview/Overview";

export default function ExpCard({
  id,
  role,
  company,
  start,
  end,
  description,
  info,
  employer_logo,
  edit,
  refetch,
}) {
  if (!id) {
    return null;
  }
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];

    return `${month}-${year}`;
  }
  return (
    <div className="w-full bg-white rounded-md border border-gray-300 my-4 flex p-4">
      <div className="min-w-[15%] max-w-[15%] mr-1">
        <img
          className="w-11 h-11 rounded-lg object-contain"
          src={employer_logo ?? defaultlogo}
        />
      </div>
      <div className="flex flex-col min-w-[70%] max-w-[70%] mr-1">
        <div className=" text-gray-700 text-base font-normal font-['Lexend'] leading-normal mb-3">
          {role}
        </div>
        <div className=" text-gray-600 text-sm font-light font-['Lexend'] leading-normal">
          {company}
        </div>
        <div className="flex mb-5 gap-1 justify-between">
          <div className="text-gray-600 text-sm font-light font-['Lexend'] leading-normal ">
            {formatDate(start)}-{end == null ? "Present" : formatDate(end)}
          </div>
          <div className="text-gray-600 text-sm font-light font-['Lexend'] leading-normal">
            {calculateYearsMonths(start, end).years >= 1
              ? calculateYearsMonths(start, end).years + " yr"
              : (calculateYearsMonths(start, end).months != 0
                  ? calculateYearsMonths(start, end).months
                  : 1) + " month"}
          </div>
        </div>
        <div className="w-full">
          <span className="text-gray-600 text-sm font-light font-['Lexend'] leading-normal">
            {description}
          </span>
        </div>
      </div>
      <div className="flex min-w-[15%] max-w-[15%] gap-1">
        <Edit
          width={60}
          height={27}
          className=" cursor-pointer"
          onClick={() => edit(info)}
        />
        <img
          src={deleteIcon}
          className=" h-5 cursor-pointer"
          onClick={() => deleteCards(id, "work_experiences", refetch)}
        />
      </div>
    </div>
  );
}
