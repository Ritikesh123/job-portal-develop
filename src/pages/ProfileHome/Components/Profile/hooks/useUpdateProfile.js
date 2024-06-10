import { updateStudentProfile } from "@/services/OtherService";
import { useMutation, useQueryClient } from "react-query";

const useUpdateProfile = () => {
  const mutation = useMutation(
    (payload) => {
      return updateStudentProfile(payload);
    },
    {
      onSuccess: () => {
        // queries after a successful mutation
      },
    }
  );

  return mutation;
};

export default useUpdateProfile;
