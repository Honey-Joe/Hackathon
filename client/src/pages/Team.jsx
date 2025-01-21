import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../BASE_URL";
import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../components/ScrollToTopButton";
import DeleteTeamMember from "../components/DeleteTeamMember";
import Loader from "../components/Loader";
import { scanner } from "../assets/asset";

const Team = () => {
  const token = localStorage.getItem("token");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    
  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!file) {
      setIsSubmitting(false);
      setMessage("Please upload the File");
    }

    const formData = new FormData();
    formData.append("paymentImage", file);

    try {
      const response = await axios.put(
        BASE_URL + `/api/users/payment/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

  useEffect(() => {
    fetchdata();
  }, [1]);

  return (
    <>
      <div className="bg-blue-950">
        <div className=" grid grid-cols-1 gap-5 ">
          <div className="text-white font-[Fredoka] flex flex-col gap-6">
            <p className="">Here is your team </p>
            <p className="text-xl">
              Note: You can add upto 2 members which{" "}
              <span className="text-2xl font-semibold">includes yourself</span>{" "}
            </p>
          </div>
          {isLoading ? (
            <>
              <div>
                <Loader></Loader>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-red-500 font-[Fredoka]">{error}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
                        <div className="flex justify-evenly gap-5">
                          <p>Department No.</p>
                          {e.degree}
                        </div>
                        <div>
                          <DeleteTeamMember
                            userId={user.id}
                            memberId={e._id}
                          ></DeleteTeamMember>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="flex flex-col gap-5 font-[Fredoka] text-white">
                <p className="text-xl">
                  Registraion fee for your team in{" "}
                  <span className="text-2xl font-semibold text-nowrap">
                    Rs. {teamMembers * 150}
                  </span>{" "}
                </p>
              </div>
              <div>
                {data.payment?.image?.data ? (
                  <>
                    <p className="font-[Fredoka] text-white text-3xl text-center">
                      You're Already Registered
                    </p>
                  </>
                ) : (
                  <>
                    <div className="">
                      <form
                        action=""
                        onSubmit={handelSubmit}
                        className="flex flex-col gap-5"
                      >
                        <div className="flex justify-center">
                          <img
                            src={scanner}
                            alt="payment scanner image"
                            className="w-[70%] lg:w-[30%]"
                          />
                        </div>
                        <p className="font-[Fredoka] text-white">
                          Please upload the screenshot of the payment image
                        </p>
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
                            isLoading
                              ? "bg-blue-300"
                              : "border border-white shadow-md shadow-white px-5 py-3 text-white font-[Fredoka] rounded-lg"
                          } focus:outline-none`}
                        >
                          {isSubmitting ? "Uploading..." : "Upload"}
                        </button>
                        <div>
                          <p className="font-[Fredoka] text-white text-2xl text-center">
                            {message}
                          </p>
                        </div>
                      </form>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Team;
