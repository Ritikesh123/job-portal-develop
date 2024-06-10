import { Search, MapPin } from "lucide-react";
import { Input } from "../../components/common/ui/input";
import { useForm, Controller } from "react-hook-form";
import { ReactComponent as Vectordown } from "@/assets/img/icons/Vectordown.svg";
import { ReactComponent as Laptop } from "@/assets/img/icons/laptop-2.svg";
import { ReactComponent as Git } from "@/assets/img/icons/git-commit.svg";
import { ReactComponent as Landmark } from "@/assets/img/icons/landmark.svg";
import { ReactComponent as Layout } from "@/assets/img/icons/layout-grid.svg";
import { ReactComponent as Group } from "@/assets/img/icons/Group.svg";
import { ReactComponent as BriefCase } from "@/assets/img/icons/briefcase.svg";
import { ReactComponent as Calendar } from "@/assets/img/icons/calendar.svg";
import { ReactComponent as Star } from "@/assets/img/icons/star.svg";
import { ReactComponent as CalendarSearch } from "@/assets/img/icons/calendar-search.svg";
import { searchJobs } from "@/services/OtherService";
import useGetAdvanceSearch from "./hooks/useGetAdvanceSearch";
import ListCard from "@/components/common/ListCard/ListCard";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import { useSearchJobs } from "@/query/queries";
import SearchSelect from "@/components/common/ui/SearchSelect";
import useMutationAdvanceSearch from "./hooks/useMutationAdvanceSearch";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/common/ui/button";
import { useNavigate } from "react-router-dom";
import defaultLogo from "@/assets/img/icons/company_default_logo.jpg";
import AutoSuggestion from "@/components/common/AutoSuggestion/AutoSuggestion";
import { getAllJobs } from "@/services/JobService";
import useGetPopularSearch from "./hooks/useGetPopularSearch";

export function initializeMap(ref, setValue, setForm) {
  const input = ref.current;
  var options = {
    types: ["(cities)"],
    componentRestrictions: { country: "in" },
  };
  const autocomplete = new window.google.maps.places.Autocomplete(
    input,
    options
  );
  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    input.value = place.name;
    if (setValue) setValue(place?.name);
    if (setForm) {
      setForm.setter(setForm.name, place?.name);
    }
  });
}
const SearchJobs = () => {
  const mapOptions = (data) => {
    if (data && Array.isArray(data)) {
      // Ensure data is an array
      return data?.map((item) => ({
        label: item.name,
        value: item.name,
      }));
    }
    return [];
  };
  const context = useUser();
  const navigate = useNavigate();
  const {
    workModesOptions,
    salaryRangesOptions,
    freshnessOptions,
    companyTypesOptions,
    postedByOptions,
    jobRolesOptions,
  } = useGetAdvanceSearch();
  const { popularSearch, refetch, isLoading } = useGetPopularSearch();

  const workModeOption = mapOptions(workModesOptions.data);
  const salaryRangeOption = mapOptions(salaryRangesOptions.data);
  const freshnessOption = mapOptions(freshnessOptions.data);
  const companyTypeOption = mapOptions(companyTypesOptions.data);
  const postedByOption = mapOptions(postedByOptions.data);

  const [topCompany, setTopCompany] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [freshness, setFreshness] = useState("");
  const [eductaion, setEducation] = useState("");
  const [roleCategory, setRoleCategory] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [workmode, setWorkmode] = useState("");
  const [companyType, setCompanyType] = useState("");
  const clearFilter = () => {
    reset({
      freshness: "",
      top_companies: "",
      postedBy: "",
      education: "",
      company_type: "",
      role_category: "",
      salary: "",
      department: "",
      workmode: "",
    });
    setTopCompany("");
    setFreshness("");
    setPostedBy("");
    setEducation("");
    setCompanyType("");
    setRoleCategory("");
    setSalary("");
    setDepartment("");
    setWorkmode("");
  };

  const [searchText, setSearchText] = useState("");
  const [searchedJob, setSearchedJob] = useState([]);

  const [searchOption, setSearchOption] = useState([]);
  const [city, setCity] = useState("");
  const [cityOption, setCityOption] = useState([]);
  const [departmentOption, setDepartmentOption] = useState([]);
  const [roleOption, setRoleOption] = useState([]);
  const [educationOption, setEducationOption] = useState([]);
  const [companyOption, setCompanyOption] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const [advanceSearch, setAdvanceSearch] = useState(false);
  const onSubmit = async (data) => {
    localStorage.setItem(
      "advanceSearch",
      JSON.stringify({
        ...data,
        freshness: data?.freshness?.label,
        top_companies: data?.top_companies?.label,
        postedBy: data?.postedBy?.label,
        education: data?.education?.label,
        company_type: data?.company_type?.label,
        role_category: data?.role_category?.label,
        salary: data?.salary?.label,
        department: data?.department?.label,
        workmode: data?.workmode?.label,
        search_location: city,
      })
    );
    try {
      const userId = JSON.parse(localStorage.getItem("login_token"));
      const formData = {
        ...data,
        search_location: city,
        userId: userId,
        limit: 4,
        offset: 0,
        freshness: data?.freshness?.label,
        top_companies: data?.top_companies?.label,
        postedBy: data?.postedBy?.label,
        education: data?.education?.label,
        company_type: data?.company_type?.label,
        role_category: data?.role_category?.label,
        salary: data?.salary?.label,
        department: data?.department?.label,
        workmode: data?.workmode?.label,
      };
      const response = searchJobs(formData);
      response.then((res) => setSearchedJob(res));
    } catch (error) {
      console.error("Error Jobs", error);
    }
  };
  const getOptionsMaster = async (val, endpoint, set) => {
    if (val) {
      try {
        const options = await getAllJobs(endpoint, {
          search: val,
        });
        set(options.data.map((item) => ({ value: item, label: item })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const locationRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      initializeMap(locationRef, setCity);
    }
  }, []);

  const searchMaster = useMemo(() => {
    return debounce((v, endpoint, set) => {
      getOptionsMaster(v, endpoint, set);
    }, 500);
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

  const searchHandler = useMemo(() => {
    return debounce((v, endpoint, tableName, set) => {
      getOptions(v, endpoint, tableName, set);
    }, 500);
  }, []);
  useEffect(() => {
    refetch();
  }, []);
  return (
    <>
      <div className="px-5 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center flex">
            {" "}
            <Search className="text-gray-500" />
            <div className="flex-grow">
              <AutoSuggestion
                {...register("jobRole")}
                options={searchOption}
                defaultVal={getValues("jobRole")}
                fetchOptions={(e) => {
                  setValue("jobRole", e);
                  searchMaster(e, "candidate-job-suggestion", setSearchOption);
                }}
                getValue={(e) => {
                  setValue("jobRole", e);
                }}
                placeholder="Search by title, skill or category"
              />
            </div>
          </div>
          <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center flex">
            <MapPin className="text-gray-500" />
            <div className="flex-grow">
              <Input
                ref={locationRef}
                className="border-none h-7 placeholder:text-gray-400 placeholder:text-base"
                placeholder="Enter location"
                defaultValue={city}
              />
              {/* <AutoSuggestion
                options={cityOption}
                defaultVal={city}
                fetchOptions={(e) => {
                  searchHandler(
                    e,
                    "get-masters-details",
                    "cities",
                    setCityOption
                  );
                  setCity(e);
                }}
                getValue={(e) => {
                  setCity(e);
                }}
                placeholder="Enter location"
              /> */}
            </div>
          </div>
          <div className="mt-7">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setAdvanceSearch((prev) => !prev)}
            >
              <div className="text-indigo-700 text-base font-normal font-['Lexend'] leading-normal">
                Advance Search
              </div>
              <div
                className={`${!advanceSearch ? "transform rotate-180" : ""} `}
              >
                <Vectordown />
              </div>
            </div>
            {advanceSearch && (
              <div>
                <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
                  <div className="text-gray-400 text-base font-normal leading-normal border-none">
                    <Laptop className="text-gray-500" />
                  </div>
                  <SearchSelect
                    {...register("workmode")}
                    className="w-full text-gray-500 text-base font-normal"
                    options={workModeOption}
                    isSearchable={true}
                    placeholder="Work Mode"
                    height="25px"
                    border={false}
                    onChange={(newValue) => {
                      setValue("workmode", newValue);
                      register("workmode").onChange(newValue);
                      setWorkmode(newValue);
                    }}
                    val={workmode}
                  />
                </div>
                <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
                  <div className="text-gray-400 text-base font-normal leading-normal border-none">
                    <Landmark className="text-gray-500" />
                  </div>
                  <SearchSelect
                    {...register("department")}
                    className="w-full text-gray-500 text-base font-normal"
                    options={departmentOption}
                    isSearchable={true}
                    placeholder="Department"
                    height="25px"
                    border={false}
                    onChange={(newValue) => {
                      setValue("department", newValue);
                      setDepartment(newValue);
                    }}
                    onInputChange={(inputVal) => {
                      searchHandler(
                        inputVal,
                        "get-masters-details",
                        "department_expertises",
                        setDepartmentOption
                      );
                    }}
                    val={department}
                    noOptionsMessage={() => "Search Department"}
                  />
                </div>
                <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
                  <div className="text-gray-400 text-base font-normal leading-normal border-none">
                    <Git className="text-gray-500" />
                  </div>
                  <SearchSelect
                    {...register("salary")}
                    className="w-full text-gray-500 text-base font-normal"
                    options={salaryRangeOption}
                    isSearchable={true}
                    placeholder="Salary Ranges"
                    height="25px"
                    border={false}
                    onChange={(newValue) => {
                      setValue("salary", newValue);
                      setSalary(newValue);
                    }}
                    val={salary}
                  />
                </div>
                <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
                  <div className="text-gray-400 text-base font-normal leading-normal border-none">
                    <Group className="text-gray-500" />
                  </div>
                  <SearchSelect
                    {...register("company_type")}
                    className="w-full text-gray-500 text-base font-normal"
                    options={companyTypeOption}
                    isSearchable={true}
                    placeholder="Company Type"
                    height="25px"
                    border={false}
                    onChange={(newValue) => {
                      setValue("company_type", newValue);
                      setCompanyType(newValue);
                    }}
                    val={companyType}
                  />
                </div>
                <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
                  <div className="text-gray-400 text-base font-normal leading-normal border-none">
                    <Layout className="text-gray-500" />
                  </div>
                  <SearchSelect
                    {...register("role_category")}
                    className="w-full text-gray-500 text-base font-normal"
                    options={roleOption}
                    isSearchable={true}
                    placeholder="Role Category"
                    height="25px"
                    border={false}
                    onChange={(newValue) => {
                      setValue("role_category", newValue);
                      setRoleCategory(newValue);
                    }}
                    onInputChange={(inputVal) => {
                      searchHandler(
                        inputVal,
                        "get-masters-details",
                        "job_roles",
                        setRoleOption
                      );
                    }}
                    val={roleCategory}
                    noOptionsMessage={() => "Search Roles"}
                  />
                </div>
                <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
                  <div className="text-gray-400 text-base font-normal leading-normal border-none">
                    <BriefCase className="text-gray-500" />
                  </div>
                  <SearchSelect
                    {...register("education")}
                    className="w-full text-gray-500 text-base font-normal"
                    options={educationOption}
                    isSearchable={true}
                    placeholder="Education"
                    height="25px"
                    border={false}
                    onChange={(newValue) => {
                      setValue("education", newValue);
                      setEducation(newValue);
                    }}
                    onInputChange={(inputVal) => {
                      searchHandler(
                        inputVal,
                        "get-masters-details",
                        "education",
                        setEducationOption
                      );
                    }}
                    val={eductaion}
                    noOptionsMessage={() => "Search Degree"}
                  />
                </div>
                <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
                  <div className="text-gray-400 text-base font-normal leading-normal border-none">
                    <Calendar className="text-gray-500" />
                  </div>
                  <SearchSelect
                    {...register("postedBy")}
                    className="w-full text-gray-500 text-base font-normal"
                    options={postedByOption}
                    isSearchable={true}
                    placeholder="Posted By"
                    height="25px"
                    border={false}
                    onChange={(newValue) => {
                      setValue("postedBy", newValue);
                      setPostedBy(newValue);
                    }}
                    val={postedBy}
                  />
                </div>
                <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
                  <div className="text-gray-400 text-base font-normal leading-normal border-none">
                    <Star className="text-gray-500" />
                  </div>
                  <SearchSelect
                    {...register("top_companies")}
                    className="w-full text-gray-500 text-base font-normal"
                    options={companyOption}
                    isSearchable={true}
                    placeholder="Top Companies"
                    height="25px"
                    border={false}
                    onChange={(newValue) => {
                      setValue("top_companies", newValue);
                      setTopCompany(newValue);
                    }}
                    onInputChange={(inputVal) => {
                      searchHandler(
                        inputVal,
                        "get-masters-details",
                        "employer_details",
                        setCompanyOption
                      );
                    }}
                    val={topCompany}
                    noOptionsMessage={() => "Search Company"}
                  />
                </div>
                <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
                  <div className="text-gray-400 text-base font-normal leading-normal border-none">
                    <CalendarSearch className="text-gray-500" />
                  </div>
                  <SearchSelect
                    {...register("freshness")}
                    className="w-full text-gray-500 text-base font-normal"
                    options={freshnessOption}
                    isSearchable={true}
                    placeholder="Freshness"
                    height="25px"
                    border={false}
                    onChange={(newValue) => {
                      setValue("freshness", newValue);
                      setFreshness(newValue);
                    }}
                    val={freshness}
                  />
                </div>
                <div className="flex justify-end items-center mt-2">
                  <div
                    className="cursor-pointer text-sm text-indigo-700 hover:underline"
                    onClick={() => clearFilter()}
                  >
                    Clear Filter
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 px-4 py-3 bg-indigo-700 rounded-md justify-center items-center gap-2.5 inline-flex mt-5"
            >
              <div className="text-white text-sm font-medium font-['Lexend'] leading-normal">
                Search Jobs
              </div>
            </button>
          </div>
          {!searchedJob?.data ? (
            <div>
              {" "}
              <div className="mt-9 mb-4 h-5  text-gray-600 text-base font-medium leading-normal">
                Popular Searches
              </div>
              <div className="flex gap-4 flex-col overflow-auto mb-3">
                {popularSearch?.popular_search?.map((item, key) => (
                  <ListCard
                    key={key}
                    job={{ job_title: item?.company_name }}
                    cardClass={"h-[60px] cursor-pointer"}
                    callback={() => {
                      setValue("jobRole", item?.company_name);
                      onSubmit({ jobRole: item?.company_name });
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-5 mt-5">
              {" "}
              <div className="w-full  flex justify-between items-center mb-4">
                <div className=" text-gray-600 text-base font-semibold leading-loose">
                  {searchedJob?.totalRecords} Jobs Available
                </div>
                {searchedJob?.totalRecords !== 0 && (
                  <Button
                    variant={"ghost"}
                    className="text-right px-3 py-2 text-slate-700 text-sm font-normal leading-tight"
                    onClick={() => {
                      navigate("/showAll/search");
                    }}
                  >
                    Show All
                  </Button>
                )}
              </div>
              <div className="flex gap-4 flex-col">
                {searchedJob?.data?.map((job) => (
                  <ListCard
                    className="cursor-pointer"
                    key={job.id}
                    job={job}
                    route={"/job/" + job.id}
                    jobCard={true}
                    icon={
                      <img
                        src={job?.employer_logo ?? defaultLogo}
                        className="h-11 w-11 object-contain"
                        alt="Employer Logo"
                      />
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
      {/* <BottomNavBar /> */}
    </>
  );
};
SearchJobs.layoutProps = {
  requiredAuth: true,
};
export default SearchJobs;
