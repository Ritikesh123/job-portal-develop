import { updateStudentPreferences } from "@/services/OtherService";
import { useMutation, useQueryClient } from "react-query";

const useUpdatePreference = () => {
  const mutation = useMutation(
    (payload) => {
      return updateStudentPreferences(payload);
    },
    {
      onSuccess: () => {
        // queries after a successful mutation
      },
    }
  );

  return mutation;
};

export default useUpdatePreference;
