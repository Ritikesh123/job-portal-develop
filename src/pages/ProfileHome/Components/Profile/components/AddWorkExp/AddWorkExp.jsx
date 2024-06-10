import { ReactComponent as WorkExp } from "@/assets/img/icons/work-experience.svg";
import { DatePicker } from "@/components/common/ui/date-picker";
import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ExpCard from "../ExpCard/ExpCard";
import Selects from "react-select";
import { debounce } from "lodash";
import { customStyles } from "../../Profile";
import { getAllJobs } from "@/services/JobService";
import { postData } from "@/services/OtherService";
import CreatableSelect from "react-select/creatable";
import Loader from "@/components/common/Loader/Loader";
export default function AddWorkExp({ data, refetch }) {
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
  const [roles, setRoles] = useState([]);
  const [company, setCompany] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [present, setPresent] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const getOptions = async (val, endpoint, tableName, set) => {
    if (val) {
      try {
        setRolesLoading(true);
        const options = await getAllJobs(endpoint, {
          tableName: tableName,
          name: val,
        });
        set(
          options.data.map((item) => ({ value: item.name, label: item.name }))
        );
        setRolesLoading(false);
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
  // const { data, isLoading, refetch } = useGetEducation({
  //   userId: localStorage.getItem("userId"),
  // });

  const onSubmit = (data) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const startDate = data?.start?.toLocaleDateString("en-GB", options);
    const endDate = data?.end?.toLocaleDateString("en-GB", options);

    try {
      setLoading(true);
      const userId = JSON.parse(localStorage.getItem("login_token"));
      const formData = {
        userId: userId,
        workExperienceId: id,
        companyName: data?.company?.value,
        roleName: data?.role?.value,
        startDate: startDate?.split("/").reverse().join("-"),
        endDate: present ? null : endDate?.split("/").reverse().join("-"),
        description: data?.desc,
        is_current_company: present,
      };
      const response = postData("add-student-work-experience", formData);
      response.then((res) => {
        if (res.code === 200) {
          reset({ company: "", role: "", start: "", end: "", desc: "" });
          setPresent(false);
          setId(null);
          refetch();
          setShowForm(false);
          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Error Adding Work Experience", error);
      setLoading(false);
    }
  };

  const updateWorkExp = (data) => {
    reset({
      company: { label: data?.company_name, value: data?.company_name },
      role: { label: data?.role_name, value: data?.role_name },
      start: new Date(data?.start_date),
      end: present ? null : new Date(data?.end_date),
      desc: data?.description,
    });
    setId(data?.id);
    setPresent(data?.end_date == null && true);
    setShowForm(true);
  };
  return (
    <div className="py-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <WorkExp height={26} width={26} />
          <div className="text-gray-700 text-base font-normal font-['Lexend'] leading-7">
            {" "}
            Your Work Experience
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
              Company
            </label>
            <Controller
              name="company"
              control={control}
              defaultValue=""
              rules={{ required: "Company Name is required" }}
              render={({ field }) => (
                <CreatableSelect
                  name="company"
                  options={company}
                  value={getValues("company")}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setValue("company", selectedOption);
                  }}
                  onInputChange={(inputVal) => {
                    searchHandler(
                      inputVal,
                      "get-masters-details",
                      "employer_details",
                      setCompany
                    );
                  }}
                  onCreateOption={(inputValue) => {
                    const newOption = { value: inputValue, label: inputValue };
                    setValue("company", newOption);
                  }}
                  noOptionsMessage={() => "Search Company"}
                  placeholder="Enter Company Name"
                />
              )}
            />
            {errors.company && (
              <p className="text-red-600 text-sm font-light my-1">
                {errors.company.message}
              </p>
            )}
          </div>
          <div>
            <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
              Role
            </label>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: "Role Name is required" }}
              render={({ field }) => (
                <CreatableSelect
                  name="role"
                  options={roles}
                  value={getValues("role")}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    setValue("role", selectedOption);
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
                    const newOption = { value: inputValue, label: inputValue };
                    setValue("role", newOption);
                  }}
                  noOptionsMessage={() => "Search Roles"}
                  placeholder="Select Role"
                />
              )}
            />
            {errors.role && (
              <p className="text-red-600 text-sm font-light my-1">
                {errors.role.message}
              </p>
            )}
          </div>
          <div>
            <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
              Start Date
              <Controller
                name="start" // Match the name with your Yup schema
                control={control}
                rules={{ required: "Start Date is required" }}
                render={({ field }) => (
                  <DatePicker
                    date={field.value}
                    setDate={(value) => {
                      setValue("start", value);
                    }}
                    className="text-gray-400 w-full text-base font-normal leading-normal "
                  />
                )}
              />
            </label>
            <p className="text-red-600 text-sm font-light my-1">
              {errors["start"]?.message}
            </p>
          </div>
          {!present && (
            <div>
              <label className=" text-gray-700 text-sm font-medium leading-6 flex flex-col gap-1.5">
                End Date
                <Controller
                  name="end"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      date={field.value}
                      setDate={(value) => setValue("end", value)}
                      className="text-gray-400 w-full text-base font-normal leading-normal "
                    />
                  )}
                />
              </label>
              <p className="text-red-600 text-sm font-light my-1">
                {errors["end"]?.message}
              </p>
            </div>
          )}
          <div className="flex">
            <Controller
              name="present"
              control={control}
              render={({ field }) => (
                <input
                  className=""
                  name="present"
                  type="checkbox"
                  checked={present}
                  onChange={(e) => setPresent(e.target.checked)}
                />
              )}
            ></Controller>
            <div className="text-gray-700 text-sm font-medium leading-6 flex gap-1.5 ml-1">
              I currently work here.
            </div>
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
                    rows="4"
                    placeholder="Job Description"
                    className="w-full text-gray-400 text-sm bg-white rounded-md font-light font-['Lexend'] border border-gray-300 leading-normal"
                    onChange={field.onChange}
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
      {data?.data?.work_experience?.map((item) => (
        <ExpCard
          role={item?.role_name}
          company={item?.company_name}
          start={item?.start_date}
          end={item?.end_date}
          description={item?.description}
          id={item?.id}
          info={item}
          employer_logo={item?.employer_logo}
          edit={updateWorkExp}
          refetch={refetch}
        />
      ))}
    </div>
  );
}
