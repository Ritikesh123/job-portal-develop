import { useState } from "react";
import { ReactComponent as Edit } from "@/assets/img/icons/Edit.svg";
import { ReactComponent as Education } from "@/assets/img/icons/education.svg";
import deleteIcon from "@/assets/img/icons/delete.svg";
import { deleteCards } from "../../Profile";
export default function EduCard({
  id,
  university,
  degree,
  yop,
  info,
  edit,
  refetch,
}) {
  const [expanded, setExpanded] = useState(false);

  if (!id) {
    return null;
  }
  return (
    <div className="w-full bg-white rounded-md border border-gray-300 my-4 flex py-3 pl-3 pr-2 pb-8 gap-2.5">
      <Education height={50} width={50} />
      <div className="flex flex-col flex-grow w-[75%]">
        <div className="  text-gray-700 text-base font-normal font-['Lexend'] leading-normal mb-3">
          {university}
        </div>
        <div className="w-full text-gray-600 text-sm font-light font-['Lexend'] leading-normal ">
          {degree}
        </div>
        <div className=" w-full text-gray-600 text-sm font-light font-['Lexend'] leading-normal">
          {yop}
        </div>
      </div>
      <div className="flex">
        <Edit
          width={50}
          height={25}
          className=" cursor-pointer"
          onClick={() => edit(info)}
        />
        <img
          src={deleteIcon}
          className=" h-5 cursor-pointer"
          onClick={() => deleteCards(id, "educations", refetch)}
        />
      </div>
    </div>
  );
}
