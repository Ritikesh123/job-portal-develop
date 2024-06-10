import SearchSelect from "@/components/common/ui/SearchSelect";
import { Checkbox } from "@/components/common/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import "./Preferences.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/common/ui/input";
import { customStyles } from "../Profile/Profile";
import useUpdatePreference from "./hook/useUpdatePreference";
import CreatableSelect from "react-select/creatable";
import useGetEducation from "../Profile/components/AddEducation/hooks/useGetEducation";
import useGetPreferenceOption from "./hook/useGetPreferenceOptions";
import { toast } from "react-toastify";
import { getAllJobs } from "@/services/JobService";
import { debounce } from "lodash";
import { initializeMap } from "@/pages/SearchJobs";

export default function Preferences() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [location, setLocation] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    Contractor: false,
    Cofounder: false,
    Intern: false,
  });
  const [preferences, setPreferences] = useState({});
  useEffect(() => {
    if (window.google) {
      initializeMap(locationRef, setLocation);
    }
  }, []);
  const getOptions = async (val, endpoint, tableName, set) => {
    if (val) {
      try {
        const options = await getAllJobs(endpoint, {
          tableName: tableName,
          name: val,
        });
        set(
          options.data.map((item) => ({ value: item.name, label: item.name }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  // const searchHandler = useMemo(() => {
  //   return debounce((v, endpoint, tableName, set) => {
  //     getOptions(v, endpoint, tableName, set);
  //   }, 500);
  // }, []);
  const options = [
    { label: "Ideal", value: "Ideal" },
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  const { data, isLoading, refetch } = useGetEducation({
    userId: JSON.parse(localStorage.getItem("login_token")),
  });
  const keysToInclude = [
    "Seed(1-10 employees)",
    "Early(11-50 employees)",
    "Mid-size(51-200 employees)",
    "Large(201-500 employees)",
    "Very Large(501-1000 employees)",
    "Massive(1000+ employees)",
  ];
  useEffect(() => {
    if (!isLoading) {
      const checkResponse =
        (
          data?.data?.preference_data?.find(
            (item) =>
              item?.question_id === "Also open to the following job type"
          )?.answer || ""
        )
          .split(",")
          ?.map((item) => {
            return {
              [item]: true,
            };
          }) ?? [];
      setCheckboxes(
        checkResponse.reduce((acc, obj) => ({ ...acc, ...obj }), {})
      );
      const resultObject = {};

      data?.data?.preference_data?.forEach((item) => {
        if (keysToInclude.includes(item?.question_id)) {
          resultObject[item?.question_id] = item?.answer;
        }
      });
      setPreferences(resultObject);
    }
    const location = data?.data?.preference_data?.find(
      (item) => item?.question_id === "What location do you want to work in?"
    )?.answer;
    setLocation(location ?? "");
    const salary = data?.data?.preference_data?.find(
      (item) => item?.question_id === "What is your desired salary?"
    )?.answer;
    const job_type = data?.data?.preference_data?.find(
      (item) => item?.question_id === "What type of job are you interested in?"
    )?.answer;
    reset({
      salary: salary,
      job_type: job_type
        ?.split(",")
        ?.map((item) => ({ label: item, value: item })),
    });
  }, [data, isLoading]);
  const updatePreferenceMutation = useUpdatePreference();
  const { preferedJobOption } = useGetPreferenceOption();
  const getQues = (res) => {
    const resArr = Object.keys(res).map((item) => ({
      questionId: item,
      answer: res[item],
    }));
    return resArr;
  };
  const locationRef = useRef(null);
  const onSubmit = async (data) => {
    try {
      const userId = JSON.parse(localStorage.getItem("login_token"));
      const formData = {
        userId: userId,
        questions: [
          {
            questionId: "What type of job are you interested in?",
            answer: data?.job_type?.map((item) => item.value)?.join(",") ?? "",
          },
          {
            questionId: "Also open to the following job type",
            answer:
              Object.keys(checkboxes)
                .filter((key) => checkboxes[key])
                .join(",") ?? "",
          },
          {
            questionId: "What location do you want to work in?",
            answer: location ?? "",
          },
          {
            questionId: "What is your desired salary?",
            answer: data?.salary ?? "",
          },
          ...getQues(preferences),
        ],
      };
      const response = await updatePreferenceMutation.mutateAsync(formData);
      // alert(response.message);
      toast.success(response.message);
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating preference");
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked,
    });
  };
  const handleRadioCheck = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };
  return (
    <>
      <div className="text-black text-xl font-normal font-['Lexend'] leading-7 mb-4">
        Select your preference
      </div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            What type of job are you interested in?
            <Controller
              name="job_type"
              control={control}
              render={({ field }) => (
                <SearchSelect
                  placeholder="Select your type"
                  name="job_type"
                  className="text-gray-400 text-sm font-light font-['Lexend'] leading-normal"
                  border={true}
                  options={preferedJobOption?.data?.map((item) => ({
                    label: item?.name,
                    value: item?.name,
                  }))}
                  multiSelect={true}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                    setValue("job_type", newValue);
                  }}
                  val={getValues("job_type")}
                />
              )}
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {errors.job_type && errors["job_type"]?.message}
          </p>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            Also open to the following job type:
            {[
              { label: "Contractor", value: "Contractor" },
              { label: "Intern", value: "Intern" },
              { label: "Co-founder", value: "Cofounder" },
            ].map((item, key) => (
              <div key={item.value}>
                <label className="text-gray-500 text-base font-normal font-['Lexend'] leading-normal flex gap-1">
                  <input
                    type="checkbox"
                    key={key}
                    name={item.value}
                    checked={checkboxes[item.value]}
                    onChange={handleCheckboxChange}
                  />
                  {item.label}
                </label>
              </div>
            ))}
          </label>
        </div>
        <div>
          <label className="text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            What location do you want to work in?
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  name="location"
                  ref={locationRef}
                  style={{ border: "1px solid #9e9e9e" }}
                  className="rounded h-9.5 placeholder:text-gray-400 placeholder:text-base"
                  placeholder="Enter location"
                  defaultValue={location}
                />
                // <CreatableSelect
                //   name="location"
                //   options={cityOption}
                //   value={location}
                //   onChange={(selectedOption) => {
                //     field.onChange(selectedOption);
                //     setLocation(selectedOption);
                //     setValue("location", selectedOption);
                //   }}
                //   onInputChange={(inputVal) => {
                //     searchHandler(
                //       inputVal,
                //       "get-masters-details",
                //       "cities",
                //       setCityOption
                //     );
                //   }}
                //   onCreateOption={(inputValue) => {
                //     const newOption = { value: inputValue, label: inputValue };
                //     setLocation(newOption);
                //     setValue("location", newOption);
                //   }}
                //   placeholder="Select location"
                // />
              )}
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {errors.location && errors["location"]?.message}
          </p>
        </div>
        <div>
          <label className="text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            What is your desired salary?
            <Controller
              name="salary"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  {...register("salary")}
                  placeholder="Enter Desired Salary"
                  onChange={(e) => {
                    setValue("salary", e.target.value);
                    field.onChange(e.target.value);
                  }}
                  style={{ border: "1px solid #9e9e9e" }}
                  className="text-gray-700 text-sm font-light font-['Lexend'] leading-normal placeholder:text-gray-400 "
                  value={getValues("salary")}
                />
              )}
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {errors.salary && errors["salary"]?.message}
          </p>
        </div>
        <div className="text-gray-700 text-sm font-medium font-['Lexend'] leading-normal ">
          Would you like to work at company of these sizes?
        </div>
        <div>
          <label className="text-gray-500 text-sm font-medium font-['Lexend'] leading-normal flex flex-col gap-1.5">
            Seed(1-10 employees)
            <Controller
              name="Seed(1-10 employees)"
              control={control}
              render={({ field }) =>
                options.map((item) => (
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="Seed(1-10 employees)"
                      value={item.value}
                      checked={
                        preferences["Seed(1-10 employees)"] === item.value
                      }
                      onChange={handleRadioCheck}
                    />
                    {item.label}
                  </label>
                ))
              }
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {errors["1-10"] && errors["1-10"]?.message}
          </p>
        </div>
        <div>
          <label className="text-gray-500 text-sm font-medium font-['Lexend'] leading-normal flex flex-col gap-1.5">
            Early(11-50 employees)
            <Controller
              name="Early(11-50 employees)"
              control={control}
              render={({ field }) =>
                options.map((item) => (
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="Early(11-50 employees)"
                      value={item.value}
                      checked={
                        preferences["Early(11-50 employees)"] === item.value
                      }
                      onChange={handleRadioCheck}
                    />
                    {item.label}
                  </label>
                ))
              }
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {errors["11-15"] && errors["11-15"]?.message}
          </p>
        </div>
        <div>
          <label className="text-gray-500 text-sm font-medium font-['Lexend'] leading-normal flex flex-col gap-1.5">
            Mid-size(51-200 employees)
            <Controller
              name="Mid-size(51-200 employees)"
              control={control}
              render={({ field }) =>
                options.map((item) => (
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="Mid-size(51-200 employees)"
                      value={item.value}
                      checked={
                        preferences["Mid-size(51-200 employees)"] === item.value
                      }
                      onChange={handleRadioCheck}
                    />
                    {item.label}
                  </label>
                ))
              }
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {errors["51-200"] && errors["51-200"]?.message}
          </p>
        </div>
        <div>
          <label className="text-gray-500 text-sm font-medium font-['Lexend'] leading-normal flex flex-col gap-1.5">
            Large(201-500 employees)
            <Controller
              name="Large(201-500 employees)"
              control={control}
              render={({ field }) =>
                options.map((item) => (
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="Large(201-500 employees)"
                      value={item.value}
                      checked={
                        preferences["Large(201-500 employees)"] === item.value
                      }
                      onChange={handleRadioCheck}
                    />
                    {item.label}
                  </label>
                ))
              }
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {errors["201-500"] && errors["201-500"]?.message}
          </p>
        </div>
        <div>
          <label className="text-gray-500 text-sm font-medium font-['Lexend'] leading-normal flex flex-col gap-1.5">
            Very Large(501-1000 employees)
            <Controller
              name="Very Large(501-1000 employees)"
              control={control}
              render={({ field }) =>
                options.map((item) => (
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="Very Large(501-1000 employees)"
                      value={item.value}
                      checked={
                        preferences["Very Large(501-1000 employees)"] ===
                        item.value
                      }
                      onChange={handleRadioCheck}
                    />
                    {item.label}
                  </label>
                ))
              }
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {errors["501-1000"] && errors["501-1000"]?.message}
          </p>
        </div>
        <div>
          <label className="text-gray-500 text-sm font-medium font-['Lexend'] leading-normal flex flex-col gap-1.5">
            Massive(1000+ employees)
            <Controller
              name="Massive(1000+ employees)"
              control={control}
              render={({ field }) =>
                options.map((item) => (
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="Massive(1000+ employees)"
                      value={item.value}
                      checked={
                        preferences["Massive(1000+ employees)"] === item.value
                      }
                      onChange={handleRadioCheck}
                    />
                    {item.label}
                  </label>
                ))
              }
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {errors["1000+"] && errors["1000+"]?.message}
          </p>
        </div>
        <div className="text-end">
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded mb-5"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}
