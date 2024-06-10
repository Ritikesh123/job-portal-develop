import { postData } from "@/services/OtherService";
import { useQuery } from "react-query";

const useGetAccountStatus = (payload) => {
  const { data, isLoading } = useQuery(
    ["get-account-status", payload?.userId],
    () => postData("get-email-phone-verified-status", payload)
  );
  return { data, isLoading };
};

export default useGetAccountStatus;
