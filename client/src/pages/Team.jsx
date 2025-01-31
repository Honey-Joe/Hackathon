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
import UpdatePayment from "./Payment";

const Team = () => {
  const token = localStorage.getItem("token");
  const componentRef = useRef();

  const generatePDF = async () => {
    const element = componentRef.current;

    try {
      // Render the component as a canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Improves quality
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait", // or "landscape"
        unit: "px", // Use pixels
        format: [canvas.width, canvas.height], // Dynamic format
      });

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // Save the PDF
      pdf.save(user.name + " team's id.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
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
        <div className=" grid grid-cols-1 gap-5">
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
                        <div className="flex gap-3 ">
                          <p>Name:</p>
                          {e.name}
                        </div>
                        <div className="flex gap-5">
                          <p>Email:</p>
                          {e.email}
                        </div>
                        <div className="grid grid-cols-2">
                          <p>Contact:</p>
                          {e.contact}
                        </div>
                        <div className="flex gap-5">
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
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-5 "
                ref={componentRef}
              >
                {data.teamMember?.map((e) => {
                  return (
                    <>
                      <div className="flex flex-col justify-center gap-5 " >
                        <div className="flex font-[Fredoka]  flex-col items-start gap-5  bg-[#081F4D] border-white  border-2 py-5 lg:px-5 px-3 rounded-lg shadow-md shadow-white mx-auto">
                          <div className="flex flex-col gap-5 text-white">
                            <p className="font-[Fredoka]  text-center font-bold text-lg lg:text-2xl text-nowrap text-[#fbe072] ">
                              DEPARTMENT OF COMPUTER SCIENCE
                            </p>
                            <div className=" flex flex-col items-center gap-0">
                              <p className="font-[Poppins] font-medium text-base lg:text-lg text-center ">
                                St. Joseph's College (Autonomous)
                              </p>
                            </div>
                            <p className="text-3xl text-center font-[Stylish] ">
                              WebSprint'25
                            </p>
                            <p className=" w-full text-center text-[#fbe072]">05-02-2025</p>
                          </div>
                          <div className="grid grid-cols-1 justify-start items-center w-[90%] gap-3 mx-auto text-white">
                            <div className="grid grid-cols-2">
                              <p>Team Id:</p>
                              <p className="text-wrap">{user.teamId}</p>
                            </div>
                            <div className="grid grid-cols-2">
                              <p>Name:</p>
                              <p className="text-wrap">{e.name}</p>
                            </div>
                            <div className="grid grid-cols-2">
                              <p>College:</p>
                              <p className="text-wrap">{user.college}</p>
                            </div>
                            <div className="grid grid-cols-2">
                              <p>Contact:</p>
                              {e.contact}
                            </div>
                          </div>
                          <div className="w-full">
                            <p className="text-[#fbe072] text-center">Valid till 5th February 2025</p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <button
                onClick={generatePDF}
                className="px-5 py-2 border-white border shadow-white shadow-md text-white font-[Fredoka] rounded-lg"
              >
                Click to get your ID
              </button>

              <div className="flex gap-2 font-[Fredoka] text-white">
                <p>Registration fee for one person : Rs.150</p>
              </div>
              <div className="flex gap-2 font-[Fredoka] text-white text-xl">
                <p>Registration fee for your team: </p>
                <p>Rs.{teamMembers * 150}</p>
              </div>
              <div></div>
            </>
          )}
        </div>
        <UpdatePayment userId={user.id}></UpdatePayment>
      </div>
    </>
  );
};

export default Team;
