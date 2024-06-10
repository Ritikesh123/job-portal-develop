import React, { useState } from "react";
import { Briefcase, Menu } from "lucide-react";
import { cn } from "@/utils/utils";
import { Button } from "@/components/common/ui/button";
import { useCallback } from "react";
import { ReactComponent as UserIcon } from "../../assets/img/icons/user.svg";
import { useNavigate } from "react-router-dom";
import "./BottomNavBar.css";

const routes = [
  {
    icon: <Briefcase width={28} height={28} strokeWidth={1} />,
    label: "Jobs",
  },
  { icon: <UserIcon height={28} width={28} />, label: "Profile/add" },
  { icon: <Menu height={28} width={28} strokeWidth={1} />, label: "More" },
];
const BottomNavBar = () => {
  const [selected, setSelected] = useState(routes[0].label);
  const navigate = useNavigate();

  const handleChange = useCallback((selected) => {
    setSelected(selected.label.toLowerCase());
    navigate(`/${selected.label.toLowerCase()}`);
  }, []);

  return (
    <footer className="w-full px-2 flex justify-between items-center bg-white border-t-[0.5px] border-gray-300">
      {routes?.map((route) => (
        <Button
          key={route.label}
          variant={"ghost"}
          onClick={() => handleChange(route)}
          className={`flex w-[4.5rem] flex-col h-auto gap-1 justify-center items-center text-[10px] ${
            selected === route.label.toLowerCase() ? "text-indigo-700" : ""
          }`}
        >
          <div className="shrink-0"> {route.icon}</div>
          {route.label}
        </Button>
      ))}
    </footer>
  );
};

export default BottomNavBar;
