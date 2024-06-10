import { ReactComponent as Skill } from "@/assets/img/icons/skills.svg";
import { ReactComponent as Search } from "@/assets/img/icons/search.svg";
import { useEffect, useState } from "react";
import useGetSkillsOptions from "./hooks/useGetSkillsOption";
import { postData } from "@/services/OtherService";
import Loader from "@/components/common/Loader/Loader";
import CreatableSelect from "react-select/creatable";

export default function Skills({ data, refetch }) {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState([]);
  const { skillsOption } = useGetSkillsOptions();
  const [loading, setLoading] = useState(false);
  const onChange = (v) => {
    setSelected(v);
  };
  useEffect(() => {
    if (data?.data?.user_data[0]?.skill)
      setSelected(
        (data?.data?.user_data[0]?.skill || "")
          .split(",")
          .map((item) => ({ label: item.trim(), value: item.trim() }))
      );
  }, [data?.data?.user_data]);
  const handleCancel = (val) => {
    const res = selected.filter((item) => item.value !== val);
    setSelected(res);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "28px",
      height: "28px",
      boxShadow: state.isFocused ? null : null,
      border: "none",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "28px",
      padding: "0 4px",
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
      height: "28px",
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: "300px", // Set the maximum height for the dropdown
      overflowY: "auto",
    }),
  };
  const submitSkills = async (skills) => {
    try {
      setLoading(true);
      const userId = JSON.parse(localStorage.getItem("login_token"));
      const formData = {
        userId: userId,
        skill: skills?.map((item) => item?.value)?.join(","),
      };
      const response = postData("add-student-skills", formData);
      response.then((res) => {
        refetch();
        setShowForm(false);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error Adding Skills", error);
      setLoading(false);
    }
  };

  return (
    <div className="py-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <Skill height={26} width={26} />
          <div className="text-gray-700 text-base font-normal font-['Lexend'] leading-7">
            Skills
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
        <>
          <div className="self-stretch gap-2 pl-3 pr-3 mt-3 py-2 w-full bg-white rounded-md border border-defaultSlate-300 justify-start items-center inline-flex">
            <div className="text-gray-400 text-base font-normal leading-normal border-none">
              <Search className="text-gray-500" />
            </div>
            {/* <SearchSelect
              className="w-full text-gray-500 text-base font-normal"
              options={skillsOption?.data?.map((item) => ({
                label: item?.name,
                value: item?.name,
              }))}
              isSearchable={true}
              placeholder="Search Skills"
              height="25px"
              border={false}
              onChange={onChange}
              val={selected}
              displayVal={false}
              multiSelect={true}
            /> */}
            <CreatableSelect
              className="w-full text-gray-500 text-base font-normal border-none"
              styles={customStyles}
              options={skillsOption?.data?.map((item) => ({
                label: item?.name,
                value: item?.name,
              }))}
              value={selected}
              onChange={(selectedOption) => {
                setSelected(selectedOption);
              }}
              // onInputChange={(inputVal) => {
              //   searchHandler(
              //     inputVal,
              //     "get-masters-details",
              //     "companies",
              //     setCompany
              //   );
              // }}
              isMulti
              controlShouldRenderValue={false}
              onCreateOption={(inputValue) => {
                const newOption = { value: inputValue, label: inputValue };
                setSelected([...selected, newOption]);
              }}
              noOptionsMessage={() => "Search Skills"}
              placeholder="Select Skills"
            />
          </div>
        </>
      )}
      {showForm && selected?.length > 0 && (
        <div className="bg-white rounded-md border border-gray-300 p-2 mt-3">
          <div className=" flex gap-2 flex-wrap">
            {selected.map((item, key) => (
              <div
                key={key}
                className=" bg-indigo-500 rounded-md py-1 px-1.5 inline-block"
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="text-white text-sm font-medium font-['Lexend'] leading-normal ">
                    {item.label}
                  </div>
                  <div
                    className="text-white text font-medium font-['Lexend'] leading-normal cursor-pointer"
                    onClick={() => handleCancel(item.value)}
                  >
                    X
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!showForm && selected?.length > 0 && (
        <div className="bg-white rounded-md border border-gray-300 p-2 mt-3">
          <div className=" flex gap-2 flex-wrap">
            {selected.map((item, key) => (
              <div
                key={key}
                className=" bg-indigo-500 rounded-md py-1 px-1.5 inline-block"
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="text-white text-sm font-medium font-['Lexend'] leading-normal ">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showForm && (
        <div className="text-start mt-5">
          <button
            onClick={() => submitSkills(selected)}
            className="bg-indigo-700 rounded-md hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded mb-5"
            disabled={loading}
          >
            <div className="flex items-center gap-2">
              Save
              <Loader size={20} loading={loading} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
