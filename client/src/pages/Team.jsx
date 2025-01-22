import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../BASE_URL";
import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../components/ScrollToTopButton";
import DeleteTeamMember from "../components/DeleteTeamMember";
import Loader from "../components/Loader";
import { scanner } from "../assets/asset";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Team = () => {
  const token = localStorage.getItem("token");
  const componentRef = useRef();

  const handleDownloadPdf = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("portrait", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(user.name + " team's id.pdf");
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
                        <div className="grid grid-cols-2 font-[Fredoka]">
                          <p>Name:</p>
                          {e.name}
                        </div>
                        <div className="grid grid-cols-2">
                          <p>Email:</p>
                          {e.email}
                        </div>
                        <div className="grid grid-cols-2">
                          <p>Contact:</p>
                          {e.contact}
                        </div>
                        <div className="grid grid-cols-2">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
                {data.teamMember?.map((e) => {
                  return (
                    <>
                      <div className="flex font-[Fredoka]  flex-col items-start gap-5  bg-[#081F4D] border-white  border-2 py-5 px-5 rounded-lg shadow-md shadow-white mx-auto" ref={componentRef}>
                        <div className="flex flex-col gap-5 w-full mx-auto text-white">
                          <p className="font-[Fredoka]  text-center font-bold text-2xl text-[#fbe072]">
                            DEPARTMENT OF COMPUTER SCIENCE
                          </p>
                          <div className=" flex flex-col items-center gap-0">
                            <p className="font-[Poppins] font-medium text-lg text-center">
                              St. Joseph's College (Autonomous)
                            </p>
                          </div>
                          <p className="text-3xl text-center font-[Stylish] ">
                            WebSprint'25
                          </p>
                        </div>
                        <div className="grid grid-cols-1 justify-start items-center w-[80%] gap-3 mx-auto text-white">
                        <div className="grid grid-cols-2">
                          <p>Team Id:</p>
                          {user.teamId}
                        </div>
                        <div className="grid grid-cols-2">
                          <p>Name:</p>
                          {e.name}
                        </div>
                        <div className="grid grid-cols-2">
                          <p>College:</p>
                          {user.college}
                        </div>
                        <div className="grid grid-cols-2">
                          <p>Email:</p>
                          {e.email}
                        </div>
                        <div className="grid grid-cols-2">
                          <p>Contact:</p>
                          {e.contact}
                        </div>
                        <div className="grid grid-cols-2">
                          <p>Department No.</p>
                          {e.degree}
                        </div>
                        </div>
                        <button
                        onClick={handleDownloadPdf}
                        className="px-5 py-2 border-white border shadow-white shadow-md text-white font-[Fredoka] rounded-lg"
                      >
                        Click to get your ID
                      </button>
                        
                      </div>
                     
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Team;
