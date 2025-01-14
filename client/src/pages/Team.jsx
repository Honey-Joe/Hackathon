import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../BASE_URL";
import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import { scanner } from "../assets/asset";
import ScrollToTopButton from "../components/ScrollToTopButton";

const Team = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [message,setMessage] = useState("");
  const [isSubmitting , setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchdata = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.get(BASE_URL + "/api/users/member/" + user.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
      setTeamMembers(res.data.teamMember.length);
    } catch (error) {
      setError(error.response.message.data);
    } finally {
      setIsLoading(false);
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!file) {
      setIsSubmitting(false)
      setMessage("Please upload the File")
    };

    const formData = new FormData();
    formData.append("paymentImage", file);

    try {
      const response = await axios.put(
        BASE_URL + `/api/users/member/${user.id}/payment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.message)
    }finally{
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [1]);

  return (
    <>
      <div className="bg-blue-950">
        <Layout>
          <ScrollToTopButton></ScrollToTopButton>
          <div className="w-[80%] lg:w-[60%] mx-auto py-28 grid grid-cols-1 gap-5 ">
            <div className="text-white font-[Fredoka] flex flex-col gap-6">
              <p className="text-4xl">Hi {user.name} ! </p>
              <p className="">Here is your team </p>
              <p>
                Note: Don't forget to include yourself. You can add upto 3
                members{" "}
              </p>
            </div>
            {isLoading ? (
              <>
                <div>Loading...</div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-red-500 font-[Fredoka]">{error}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {data.teamMember?.map((e) => {
                    return (
                      <>
                        <div className="flex font-[Fredoka]  flex-col items-start gap-3 bg-white border-black  border-2 py-5 px-5 rounded-lg shadow-md shadow-white">
                          <div className="flex justify-evenly gap-5 font-[Fredoka]">
                            <p>Name:</p>
                            {e.name}
                          </div>
                          <div className="flex justify-evenly gap-5">
                            <p>Email:</p>
                            {e.email}
                          </div>
                          <div className="flex justify-evenly gap-5">
                            <p>Contact:</p>
                            {e.contact}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </>
            )}

            <div>
              <Link to={"/profile"}>
                <button className="px-5 py-2 border border-white rounded-lg shadow-md shadow-white font-[Fredoka] text-white">
                  Add team member !
                </button>
              </Link>
            </div>
            <form
              action=""
              onSubmit={handelSubmit}
              className="flex justify-center items-center flex-col gap-6"
            >
              <div className="flex flex-col gap-5 font-[Fredoka] text-white">
                <p>Regitration Fee for each member in Rs. 150 </p>
                <p>Registraion fee for your team in Rs. {teamMembers * 150}</p>
                <div className="flex justify-center">
                  <img
                    src={scanner}
                    alt="payment scanner image"
                    className="w-[70%] lg:w-[30%]"
                  />
                </div>
                <p>Please upload the screenshot of the payment image</p>
              </div>
              <input
                type="file"
                name="screensshot"
                accept="image/*"
                id=""
                className="border border-white shadow-md shadow-white px-5 py-3 text-white font-[Fredoka] rounded-lg "
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />

<button
                type="submit"
                disabled={isSubmitting}
                className={` px-4 py-2 text-white font-medium rounded-md ${
                  isLoading ? "bg-blue-300" : "border border-white shadow-md shadow-white px-5 py-3 text-white font-[Fredoka] rounded-lg"
                } focus:outline-none`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
                <div>
                  <p className="font-[Fredoka] text-white text-xl">{message}</p>
                </div>
            </form>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Team;
