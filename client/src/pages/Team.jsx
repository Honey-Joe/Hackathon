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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [teamMembers, setTeamMembers] = useState(null)
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
            <p>
              Note: Don't forget to include yourself. You can add upto 3 members{" "}
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
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
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
                <p>Regitration Fee for each member in Rs. 150 </p>
                <p>Registraion fee for your team in Rs. {teamMembers * 150}</p>
                
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Team;
