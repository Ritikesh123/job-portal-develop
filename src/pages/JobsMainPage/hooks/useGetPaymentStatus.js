import { postData } from "@/services/OtherService";

import { useQuery } from "react-query";

const useGetPaymentStatus = (payload) => {
  const { data, isLoading, error, refetch } = useQuery(
    ["getPaymentStatus", payload],
    () => postData("payment-status", payload)
  );
  return { data, isLoading, error, refetch };
};

export default useGetPaymentStatus;
