import { Input } from "@/components/common/ui/input";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { DatePicker } from "@/components/common/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import SearchSelect from "@/components/common/ui/SearchSelect";
import { Checkbox } from "@/components/common/ui/checkbox";
import AddWorkExp from "./components/AddWorkExp/AddWorkExp";
import AddEducation from "./components/AddEducation/AddEducation";
import Skills from "./components/skills/Skills";
import Certification from "./components/certification/Certification";
import {
  fetchMasterData,
  getStudentProfile,
  postData,
  updateStudentProfile,
} from "@/services/OtherService";
import { getAllJobs, getJobRoles } from "@/services/JobService";
import useUpdateProfile from "./hooks/useUpdateProfile";
import useGetProfileOptions from "./hooks/useGetProfileOptions";
import Selects from "react-select";
import { debounce, set } from "lodash";
import CreatableSelect from "react-select/creatable";
import { da } from "date-fns/locale";
import useGetProfileData from "./hooks/useGetProfileData";
import Loader from "@/components/common/Loader/Loader";
import { calculateAge } from "@/pages/CreateProfile/CreateProfile";
import { Button } from "@/components/common/ui/button";
import { initializeMap } from "@/pages/SearchJobs";

const languages = [
  { value: "Hindi", label: "Hindi" },
  { value: "English", label: "English" },
  { value: "Marathi", label: "Marathi" },
];

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#9e9e9e",
    minHeight: "38px",
    height: "38px",
    boxShadow: state.isFocused ? null : null,
    border: true ? "" : "none",
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "38px",
    padding: "0 4px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9e9da1",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "38px",
  }),
  menu: (provided) => ({
    ...provided,
    maxHeight: "300px", // Set the maximum height for the dropdown
    overflowY: "auto",
  }),
};
export const deleteCards = async (val, type, refetch) => {
  try {
    const userId = JSON.parse(localStorage.getItem("login_token"));
    const formData = {
      userId: userId,
      cardName: type,
      id: val,
    };
    const response = postData("delete-candidate-profile-cards", formData);
    response.then((res) => {
      refetch();
    });
  } catch (error) {
    console.error("Error Deleting", error);
    throw error;
  }
};

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
  { label: "Don’t want to reveal", value: "Don’t want to reveal" },
];

const Profile = () => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [imgErrorMsg, setImgErrorMsg] = useState("");
  const [city, setCity] = useState("");
  const { data, isLoading, refetch } = useGetProfileData({
    userId: JSON.parse(localStorage.getItem("login_token")),
  });
  const [cityOption, setCityOption] = useState([]);
  const [languageOption, setLanguageOption] = useState([]);
  const setDateOfBirth = (value) => {
    setValue("dob", value);
    const dateOfBirth = new Date(value);
    const age = calculateAge(dateOfBirth);
    if (age < 16) {
      setError("dob", {
        type: "manual",
        message: "You must be at least 16 years old",
      });
    } else {
      clearErrors("dob");
    }
  };
  const locationRef = useRef(null);
  useEffect(() => {
    if (window.google) {
      initializeMap(locationRef, "", {
        setter: setValue,
        name: "location",
      });
    }
  }, []);
  const { DIOptions, experienceOption, hobbiesOption } = useGetProfileOptions();
  const [roles, setRoles] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

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

  const searchHandler = useMemo(() => {
    return debounce((v, endpoint, tableName, set) => {
      getOptions(v, endpoint, tableName, set);
    }, 500);
  }, []);

  const mapFunction = (arr) => {
    return arr?.split(",").map((item) => {
      if (item.trim() !== "") {
        return {
          value: item,
          label: item,
        };
      }
    });
  };

  const updateProfileMutation = useUpdateProfile();
  const onSubmit = async (data) => {
    try {
      const userId = JSON.parse(localStorage.getItem("login_token"));
      const formData = {
        ...data,
        userId: userId,
        hobbies: data?.hobbies?.map((item) => item?.value),
        languages: data?.languages?.map((item) => item?.value),
        location: data?.location,
        gender: data?.gender?.value,
        primaryRole: data?.primaryRole?.value,
        yoe: data?.yoe?.value,
        profileImage: image?.includes("https") ? "" : image,
        dniCategory: data?.dniCategory?.value,
        is_private: data?.isPrivate ? 1 : 0,
      };
      const response = await updateProfileMutation.mutateAsync(formData);
      toast.success(response.message);
      refetch();
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  useEffect(() => {
    if (!isLoading && data?.data?.user_data.length) {
      setImage(data?.data?.user_data[0]?.candidate_profile_picture);
      const userLanguages = mapFunction(data?.data?.user_data[0]?.languages);

      setSelectedLanguages(userLanguages);
      const userHobbies = mapFunction(data?.data?.user_data[0]?.hobbies);
      setSelectedHobbies(userHobbies);

      const dobValue = data?.data?.user_data[0]?.dob;
      const dob = dobValue ? new Date(dobValue) : null;

      reset({
        name: data?.data?.user_data[0]?.name,
        dob: dob ?? "",
        gender: data?.data?.user_data[0]?.gender
          ? {
              label: data?.data?.user_data[0]?.gender,
              value: data?.data?.user_data[0]?.gender,
            }
          : "",
        primaryRole: data?.data?.user_data[0]?.job_role
          ? {
              label: data?.data?.user_data[0]?.job_role,
              value: data?.data?.user_data[0]?.job_role,
            }
          : "",
        yoe: data?.data?.user_data[0]?.experience
          ? {
              label: data?.data?.user_data[0]?.experience,
              value: data?.data?.user_data[0]?.experience,
            }
          : "",
        location: data?.data?.user_data[0]?.location ?? "",
        dniCategory: data?.data?.user_data[0]?.dni_category
          ? {
              label: data?.data?.user_data[0]?.dni_category,
              value: data?.data?.user_data[0]?.dni_category,
            }
          : "",
        languages: userLanguages,
        hobbies: userHobbies,
        bio: data?.data?.user_data[0]?.bio,
        isPrivate: data.data.user_data[0].is_private == 1 ? true : false,
      });
    }
  }, [data]);

  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    const MAX_FILE_SIZE = 2048;
    const file = event.target.files[0];
    const fileSizeKiloBytes = file.size / 1024;
    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setImage(null);
      setImgErrorMsg("Image size is greater than maximum limit of 2 MB");
      return;
    }
    if (file) {
      const reader = new FileReader();
      setImgErrorMsg("");
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const imageInputRef = useRef(null);
  return (
    <>
      <div className="flex justify-between items-center gap-10 py-10">
        <div className=" rounded-bl-md rounded-br-md flex-col justify-center items-center inline-flex">
          <img className="w-20 h-20 rounded-full object-cover" src={image} />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={imageInputRef}
        />

        <div className=" flex-col flex-grow">
          <button
            className="bg-white w-full rounded-md border border-gray-300 py-3 pl-3 "
            onClick={() => {
              imageInputRef.current.click();
            }}
          >
            Upload Photo
          </button>
          {imgErrorMsg && (
            <div className="text-red-600 text-sm">{imgErrorMsg}</div>
          )}
        </div>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-gray-700 text-sm font-medium font-['Lexend'] leading-normal">
          Your Name
        </div>
        <Input
          {...register("name")}
          placeholder="Enter your name"
          className="text-black-500 text-base font-normal font-['Lexend'] leading-normal"
        />
        <div>
          <label className="text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            Date of Birth
            <Controller
              name="dob" // Match the name with your Yup schema
              control={control}
              render={({ field }) => (
                <DatePicker
                  date={field.value}
                  setDate={setDateOfBirth}
                  className="text-black-500 text-base font-normal font-['Lexend'] leading-normal w-full"
                />
              )}
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {errors["dob"]?.message}
          </p>
        </div>
        <div>
          <label className="text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            Gender
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <SearchSelect
                  className="w-full"
                  options={genderOptions}
                  isSearchable={false}
                  placeholder="Select your gender"
                  height="38px"
                  border={true}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                    setValue("gender", newValue);
                  }}
                  val={getValues("gender")}
                />
              )}
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {" "}
            {errors["gender"]?.message}
          </p>
        </div>
        <div>
          <label className="text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            Select Your Primary Role
            <Controller
              name="primaryRole"
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  name="primaryRole"
                  options={roles}
                  value={getValues("primaryRole")}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setValue("primaryRole", selectedOption);
                  }}
                  onInputChange={(inputVal) => {
                    searchHandler(
                      inputVal,
                      "get-masters-details",
                      "job_roles",
                      setRoles
                    );
                  }}
                  onCreateOption={(inputValue) => {
                    const newOption = {
                      value: inputValue,
                      label: inputValue,
                    };
                    setValue("primaryRole", newOption);
                  }}
                  noOptionsMessage={() => "Search Roles"}
                  placeholder="Select Role"
                />
              )}
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {" "}
            {errors["role"]?.message}
          </p>
        </div>
        <div>
          <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            Years of Experience
            <Controller
              name="yoe"
              control={control}
              render={({ field }) => (
                <SearchSelect
                  placeholder="Select your Experience"
                  className="text-gray-700 text-sm font-light font-['Lexend'] leading-normal"
                  border={true}
                  options={experienceOption?.data?.map((item) => ({
                    label: item?.id,
                    value: item?.id,
                  }))}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                    setValue("yoe", newValue);
                  }}
                  val={getValues("yoe")}
                />
              )}
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {" "}
            {errors["yoe"]?.message}
          </p>
        </div>
        <div>
          <label className="text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            Where are you based?
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
                  defaultValue={getValues("location")}
                />
                // <CreatableSelect
                //   name="location"
                //   options={cityOption}
                //   value={getValues("location")}
                //   onChange={(selectedOption) => {
                //     field.onChange(selectedOption);
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
                //     setValue("location", newOption);
                //   }}
                //   placeholder="Select location"
                // />
              )}
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {" "}
            {errors["location"]?.message}
          </p>
        </div>
        <div>
          <label className="text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            D & I Category
            <Controller
              name="dniCategory"
              control={control}
              render={({ field }) => (
                <SearchSelect
                  className="w-full text-black text-base font-normal font-['Lexend'] leading-normal"
                  options={DIOptions?.data?.map((item) => ({
                    value: item.name,
                    label: item.name,
                  }))}
                  isSearchable={false}
                  placeholder="Select an option"
                  height="38px"
                  border={true}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                    setValue("dniCategory", newValue);
                  }}
                  val={getValues("dniCategory")}
                />
              )}
            />
          </label>
          <p className="text-red-600 text-sm font-light my-1">
            {" "}
            {errors["dniCategory"]?.message}
          </p>
        </div>
        <div className="flex">
          <Controller
            name="isPrivate"
            control={control}
            render={({ field }) => (
              <Checkbox
                className="mt-1"
                checked={field.value}
                onCheckedChange={field.onChange}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          ></Controller>
          <div className="text-gray-700 text-sm font-medium leading-6 flex gap-1.5 ml-1">
            Private
          </div>
        </div>
        <div>
          <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            Languages
            <CreatableSelect
              name="languages"
              options={languageOption}
              isMulti // Enable multi-select
              value={selectedLanguages}
              onChange={(selectedOptions) => {
                setSelectedLanguages(selectedOptions);
                setValue("languages", selectedOptions);
              }}
              onInputChange={(inputVal) => {
                searchHandler(
                  inputVal,
                  "get-masters-details",
                  "languages",
                  setLanguageOption
                );
              }}
              onCreateOption={(inputValue) => {
                // Create a new option for the custom value entered by the user
                const newOption = { value: inputValue, label: inputValue };
                setSelectedLanguages([...selectedLanguages, newOption]);
                setValue("languages", [...selectedLanguages, newOption]);
              }}
              styles={customStyles}
              placeholder="Select or enter Languages"
            />
          </label>
        </div>
        <div>
          <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            Hobbies
            <Controller
              name="hobbies"
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  name="hobbies"
                  options={hobbiesOption?.data?.map((item) => ({
                    value: item.name,
                    label: item.name,
                  }))}
                  isMulti
                  value={selectedHobbies}
                  onChange={(selectedOptions) => {
                    setSelectedHobbies(selectedOptions);
                    setValue("hobbies", selectedOptions);
                  }}
                  onCreateOption={(inputValue) => {
                    const newOption = { value: inputValue, label: inputValue };
                    setSelectedHobbies([...selectedHobbies, newOption]);
                    setValue("hobbies", [...selectedHobbies, newOption]);
                  }}
                  placeholder="Select or Enter Hobbies"
                />
              )}
            />
          </label>
        </div>
        <div>
          <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
            Summary
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <textarea
                  rows="4"
                  placeholder="Tell us about Yourself"
                  className="w-full text-black-400 text-sm font-light font-['Lexend'] leading-normal border border-gray-300 rounded-md"
                  onChange={(val) => {
                    setValue("bio", val.target.value);
                    field.onChange(val.target.value);
                  }}
                  value={getValues("bio")}
                />
              )}
            />
          </label>
        </div>
        <div className="text-end">
          <Button
            type="submit"
            className="mb-5 py-2 px-4"
            // className="bg-indigo-700 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded mb-5 cursor-pointer"
            disabled={
              updateProfileMutation.isLoading || Object.keys(errors).length > 0
            }
          >
            <div className="flex items-center gap-2">
              <div>Update</div>
              <Loader size={20} loading={updateProfileMutation.isLoading} />
            </div>
          </Button>
        </div>
      </form>
      <div className=" w-full bg-white border border-gray-300"></div>
      <AddWorkExp data={data ?? {}} refetch={refetch} />
      <div className=" w-full bg-white border border-gray-300"></div>
      <AddEducation data={data ?? {}} refetch={refetch} />
      <div className=" w-full bg-white border border-gray-300"></div>
      <Skills data={data ?? {}} refetch={refetch} />
      <div className=" w-full bg-white border border-gray-300"></div>
      <Certification data={data ?? {}} refetch={refetch} />
    </>
  );
};
Profile.layoutProps = {
  requiredAuth: true,
};
export default Profile;
