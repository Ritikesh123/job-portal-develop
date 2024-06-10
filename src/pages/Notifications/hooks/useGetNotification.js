import { postData } from "@/services/OtherService";

import { useQuery } from "react-query";

const useGetNotification = (payload) => {
  const { data, isLoading, error, refetch } = useQuery(
    ["getNotificationPreference", payload],
    () => postData("candidate-platform-setting", payload)
  );
  return { data, isLoading, error, refetch };
};

export default useGetNotification;
