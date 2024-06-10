import { postData } from "@/services/OtherService";
import { useMutation } from "react-query";

const usePostNotification = () => {
  const mutation = useMutation(
    (payload) => {
      return postData("add-candidate-platform-setting", payload);
    },
    {
      onSuccess: () => {
        // queries after a successful mutation
      },
    }
  );

  return mutation;
};

export default usePostNotification;
