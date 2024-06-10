import React, { useEffect, useMemo, useState } from "react";
import Switch from "react-switch";
import usePostNotification from "./hooks/usePostNotification";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import useGetNotification from "./hooks/useGetNotification";

function Notifications() {
  const [jobAlerts, setJobAlerts] = useState(false);
  const postNotification = usePostNotification();
  const { data, isLoading, refetch } = useGetNotification({
    userId: JSON.parse(localStorage.getItem("login_token")),
  });
  const postData = useMemo(() => {
    return debounce(async (key, value) => {
      const response = await postNotification.mutateAsync({
        userId: JSON.parse(localStorage.getItem("login_token")),
        key: key,
        value: value,
      });
      toast.success(response.message);
      refetch();
    }, 1500);
  }, []);
  useEffect(() => {
    if (!isLoading) setJobAlerts(data?.data?.job_alerts == 1 ? true : false);
  }, [data]);

  return (
    <div className="p-4">
      <div className="text-gray-600 text-base font-medium font-['Lexend'] leading-normal py-4">
        Notification
      </div>
      <div className="flex flex-col rounded-md border border-grey-400 overflow-hidden shadow px-3 py-4 bg-white">
        <div className="flex justify-between">
          <div className="text-gray-500 text-sm font-medium font-['Lexend'] leading-normal">
            Job Alert
          </div>
          <Switch
            onChange={(e) => {
              setJobAlerts((prev) => !prev);
              postData("job_alerts", e);
            }}
            checked={jobAlerts}
            uncheckedIcon={false}
            checkedIcon={false}
            className="react-switch"
            handleDiameter={17}
            onColor="#22C55E"
            width={36}
            height={18}
          />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
