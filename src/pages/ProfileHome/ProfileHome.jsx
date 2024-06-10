import ProgressBar from "@/components/common/ProgressBar/ProgressBar";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { postData } from "@/services/OtherService";

export default function ProfileHome() {
  const [selected, setSelected] = useState("Profile");
  const [profilePercent, setProfilePercent] = useState(0);
  const navigate = useNavigate();

  const sections = [
    { label: "Overview", value: "overview" },
    { label: "Profile", value: "add" },
    { label: "Preferences", value: "preferences" },
  ];
  const onChange = (section) => {
    setSelected(section.label);
    navigate(`/profile/${section.value}`);
  };
  useEffect(() => {
    try {
      const response = postData("profile-complete-percentage", {
        userId: JSON.parse(localStorage.getItem("login_token")),
      });
      response.then((res) => {
        setProfilePercent(res?.data?.total_percentage);
      });
    } catch (error) {}
    navigate("/profile/add");
  }, []);
  return (
    <>
      <div className="flex py-3 justify-center bg-white">
        <div className="w-full flex justify-around gap-2 ">
          {sections.map((item, key) => (
            <div
              key={key}
              className={`${
                selected === item.label ? "bg-indigo-700 text-white" : ""
              } cursor-pointer px-5 py-2 rounded`}
              onClick={() => onChange(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 py-4">
        <ProgressBar label="Profile Progress" progress={profilePercent ?? 10} />
      </div>
      <div className="bg-white">
        <div className="px-4">
          <Outlet />
        </div>
      </div>
      {/* <BottomNavBar /> */}
    </>
  );
}
ProfileHome.layoutProps = {
  requiredAuth: true,
};
