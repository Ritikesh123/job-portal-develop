import { ReactComponent as Education } from "@/assets/img/icons/Icon-ducation.svg";
import { DatePicker } from "@/components/common/ui/date-picker";
import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/common/ui/input";
import EduCard from "../EduCard/EduCard";
import { postData } from "@/services/OtherService";
import { getAllJobs } from "@/services/JobService";
import { debounce } from "lodash";
import CreatableSelect from "react-select/creatable";
import Loader from "@/components/common/Loader/Loader";
export default function AddEducation({ data, refetch }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(false);
  const [degree, setDegree] = useState([]);
  const [university, setUniversity] = useState([]);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  // const { data, isLoading, refetch } = useGetEducation({
  //   userId: localStorage.getItem("userId"),
  // });
  const onSubmit = (data) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = data.yop.toLocaleDateString("en-GB", options);
    try {
      setLoading(true);
      const userId = JSON.parse(localStorage.getItem("login_token"));
      const formData = {
        userId: userId,
        educationId: id,
        degreeName: data?.degree?.value,
        universityName: data?.university?.value,
        passingYear: formattedDate.split("/").reverse().join("-"),
        percentage: data?.percentage,
        description: data?.desc,
      };
      const response = postData("add-student-education", formData);
      response.then((res) => {
        reset({
          degree: "",
          university: "",
          yop: "",
          percentage: "",
          desc: "",
        });
        setShowForm(false);
        setId(null);
        refetch();
        setLoading(false);
      });
    } catch (error) {
      console.error("Error Adding Education", error);
      setLoading(false);
    }
  };

  const updateEducation = (data) => {
    reset({
      degree: {
        label: data?.degree,
        value: data?.degree,
      },
      university: {
        label: data?.university,
        value: data?.university,
      },
      yop: new Date(data?.passing_year),
      percentage: data?.percentage,
      desc: data?.description,
    });
    setId(data?.id);
    setShowForm(true);
  };

  const setPassing = (value) => {
    setValue("yop", value);
  };
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
  return (
    <div className="py-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <Education height={26} width={26} />
          <div className="text-gray-700 text-base font-normal font-['Lexend'] leading-7">
            {" "}
            Education
          </div>
        </div>
        <button
          className="bg-gray-200 w-7 h-7 rounded-full text-black"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {!showForm ? "+" : "-"}
        </button>
      </div>
      {showForm && (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
              Degree
            </label>
            <Controller
              name="degree"
              control={control}
              rules={{ required: "Degree is required" }}
              render={({ field }) => (
                <CreatableSelect
                  name="degree"
                  options={degree}
                  value={getValues("degree")}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setValue("degree", selectedOption);
                  }}
                  onInputChange={(inputVal) => {
                    searchHandler(
                      inputVal,
                      "get-masters-details",
                      "education",
                      setDegree
                    );
                  }}
                  onCreateOption={(inputValue) => {
                    const newOption = { value: inputValue, label: inputValue };
                    setValue("degree", newOption);
                  }}
                  placeholder="Select Degree"
                />
              )}
            />
            {errors.degree && <p>{errors.degree.message}</p>}
          </div>
          <div>
            <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
              University
            </label>
            <Controller
              name="university"
              control={control}
              rules={{ required: "University is required" }}
              render={({ field }) => (
                <CreatableSelect
                  name="university"
                  options={university}
                  value={getValues("university")}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setValue("university", selectedOption);
                  }}
                  onInputChange={(inputVal) => {
                    searchHandler(
                      inputVal,
                      "get-masters-details",
                      "universities",
                      setUniversity
                    );
                  }}
                  onCreateOption={(inputValue) => {
                    const newOption = { value: inputValue, label: inputValue };
                    setValue("university", newOption);
                  }}
                  placeholder="Select University"
                  noOptionsMessage={() => "Add or Select"}
                />
              )}
            />
            {errors.university && <p>{errors.university.message}</p>}
          </div>
          <div>
            <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
              Year of Passing
              <Controller
                name="yop"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    date={field.value}
                    setDate={setPassing}
                    className="text-gray-400 w-full text-base font-normal leading-normal "
                  />
                )}
              />
            </label>
            <p className="text-red-600 text-sm font-light my-1">
              {errors["yop"]?.message}
            </p>
          </div>
          <div>
            <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
              Percentage
              <Controller
                name="percentage"
                control={control}
                render={({ field }) => (
                  <Input
                    {...register("percentage")}
                    type="number"
                    placeholder="Enter Percentage"
                  />
                )}
              />
            </label>
          </div>
          <div>
            <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
              Description
              <Controller
                name="desc"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...register("desc")}
                    rows={5}
                    placeholder="Awards and achievements"
                    className="w-full text-gray-400 text-sm font-light font-['Lexend'] leading-normal border border-gray-300 rounded-md"
                  />
                )}
              />
            </label>
          </div>
          <div className="text-start">
            <button
              type="submit"
              className="bg-indigo-700 rounded-md hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded mb-5"
              disabled={loading}
            >
              <div className="flex items-center gap-2">
                Save
                <Loader size={20} loading={loading} />
              </div>
            </button>
          </div>
        </form>
      )}
      {data?.data?.education_data?.map((item) => (
        <EduCard
          id={item?.id}
          university={item?.university}
          degree={item?.degree}
          yop={item?.passing_year}
          edit={updateEducation}
          info={item}
          refetch={refetch}
        />
      ))}
    </div>
  );
}
