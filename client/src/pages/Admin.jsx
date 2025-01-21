import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Loader from "../components/Loader";
import DeleteTeam from "../components/DeleteTeam";
import FetchAllTeamMember from "../components/FetchAllTeamMember";
import SearchBox from "../components/SearchBox";
import ScrollToTop from "../components/ScrollTop";

const Admin = () => {
  const [data, setData] = useState([]);
  const memberlength = data.length;
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  
  
  const fetchdata = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.get(BASE_URL + "/api/users/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(res.data);
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [1]);
  return (
    <div className="bg-blue-950">
      <Layout>
        <ScrollToTopButton></ScrollToTopButton>
        <ScrollToTop></ScrollToTop>
        <div>
          <div className="w-[90%] lg:w-[65%] mx-auto grid grid-cols-1 h-full">
            <div className="py-[120px] flex flex-col gap-6">
              <p className="font-[Fredoka] text-white text-2xl">
                Hi {user.name} !
              </p>
              <div className="flex flex-col gap-3">
                <p className="text-white font-[Fredoka] text-lg">
                  Total Teams : {memberlength - 1}
                </p>
                <FetchAllTeamMember></FetchAllTeamMember>
              </div>
              <SearchBox></SearchBox>
              <div>
                {isLoading ? (
                  <>
                    <Loader></Loader>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {data.map((e) => {
                        return (
                          <>
                            <div
                              className={
                                e.name == "Admin"
                                  ? "hidden"
                                  : "flex font-[Fredoka]  flex-col items-start gap-3 bg-white border-black  border-2 py-5 px-5 rounded-lg shadow-md shadow-white"
                              }
                            >
                              <div className="flex justify-evenly gap-5 font-[Fredoka]">
                                <p>Name:</p>
                                {e.name}
                              </div>
                              <div className="flex justify-evenly gap-5">
                                <p>Email:</p>
                                {e.email}
                              </div>
                              <div className="flex justify-evenly gap-5">
                                <p>College:</p>
                                {e.college}
                              </div>
                              <div className="flex justify-evenly gap-5">
                                <p>Department:</p>
                                {e.dept}
                              </div>
                              <div className="flex justify-evenly gap-5">
                                <p>Contact:</p>
                                {e.contact}
                              </div>
                              <div className="flex justify-evenly gap-5">
                                <p>Payment</p>
                                {e.payment?.image?.data ? (
                                  <>Paid</>
                                ) : (
                                  <>Not paid</>
                                )}
                              </div>
                              <div className="flex justify-evenly gap-5">
                                <p>No. of Team Member:</p>
                                {e.teamMember.length}
                              </div>
                             
                              <div className="flex justify-between w-full">
                                <Link to={"/admin/" + e._id}>
                                  <button className="bg-black px-5 py-2 rounded-lg text-white font-[Fredoka]">
                                    Team Details
                                  </button>
                                </Link>
                                <div>
                                <DeleteTeam userId={e._id}></DeleteTeam>
                              </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Admin;
