import { ReactComponent as Certificate } from "@/assets/img/icons/certification.svg";
import { useState } from "react";
import { postData } from "@/services/OtherService";
import Loader from "@/components/common/Loader/Loader";
import deleteIcon from "@/assets/img/icons/delete.svg";
import { deleteCards } from "../../Profile";

export default function Certification({ data, refetch }) {
  const [showForm, setShowForm] = useState(false);
  const [certificate, setCertificate] = useState();
  const [loading, setLoading] = useState(false);
  // const { data, isLoading, refetch } = useGetEducation({
  //   userId: localStorage.getItem("userId"),
  // });
  const submitCertificate = async (val) => {
    try {
      setLoading(true);
      const userId = JSON.parse(localStorage.getItem("login_token"));
      const formData = {
        userId: userId,
        certificationDetails: val,
      };
      const response = postData("add-student-certifications", formData);
      response.then((res) => {
        setCertificate("");
        refetch();
        setLoading(false);
        setShowForm(false);
      });
    } catch (error) {
      console.error("Error Adding Skills", error);
      setLoading(false);
      throw error;
    }
  };

  return (
    <div className="py-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <Certificate height={26} width={26} />
          <div className="text-gray-700 text-base font-normal font-['Lexend'] leading-7">
            Certifications
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
          <div className="w-full">
            <textarea
              className="w-full bg-white rounded-md border border-gray-300 my-2 rounded-md"
              rows={5}
              value={certificate}
              onChange={(e) => setCertificate(e.target.value)}
              placeholder="certifications here"
            ></textarea>
          </div>

          <div className="text-start">
            <button
              onClick={() => submitCertificate(certificate)}
              className="bg-indigo-700 rounded-md hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded mb-5"
              disabled={loading}
            >
              <div className="flex items-center gap-2">
                Save
                <Loader size={20} loading={loading} />
              </div>
            </button>
          </div>
        </>
      )}
      {data?.data?.certifications_data?.length > 0 &&
        data?.data?.certifications_data[0].id !== null &&
        data?.data?.certifications_data.map((item) =>
          item?.id ? (
            <div
              className="w-full bg-white rounded-md border border-gray-300 pr-2 py-3 pl-3 mb-3 mt-3 flex"
              key={item.id}
            >
              <div className="flex-grow ">{item.detail}</div>
              <img
                src={deleteIcon}
                className="w-5 h-5 cursor-pointer"
                onClick={() => deleteCards(item?.id, "certifications", refetch)}
              />
            </div>
          ) : null
        )}
    </div>
  );
}
