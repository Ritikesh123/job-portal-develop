import { postData } from "@/services/OtherService";

import { useQuery } from "react-query";

const useGetReceipt = (payload) => {
  const { data, isLoading, error, refetch } = useQuery(
    ["getReceipt", payload],
    () => postData("payment-receipt", payload)
  );
  return { data, isLoading, error, refetch };
};

export default useGetReceipt;
