import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../BASE_URL";
import { useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import DisplayPaymentImage from "./TeamImage";
import Loader from "../components/Loader";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdminTeam = () => {
  const id = useParams();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const componentRef = useRef();
  const user = JSON.parse(localStorage.getItem("user"));


  const generatePDF = async () => {
    const element = componentRef.current;

    // Capture the element with html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale improves quality
      scrollX: 0, // Avoid horizontal scroll in canvas capture
      scrollY: 0,
    });

    const imgData = canvas.toDataURL("image/png");

    // Get the element's size
    const imgWidth = canvas.width; // Width of the captured content
    const imgHeight = canvas.height; // Height of the captured content

    // Initialize jsPDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth(); // PDF page width
    const pdfHeight = pdf.internal.pageSize.getHeight(); // PDF page height

    if (imgWidth > pdfWidth) {
      // Scale down width to fit
      const scaleFactor = pdfWidth / imgWidth;
      const adjustedHeight = imgHeight * scaleFactor;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, adjustedHeight);
    } else {
      // If width fits, scale by height
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    }

    // Save the PDF
    pdf.save(data.name+" team's id.pdf");
  };
  const [data, setData] = useState([]);
  const fetchdata = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(
        BASE_URL + "/api/users/member/" + id.id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      setError(error.response.data.message);
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
        <div>
          {}
          <div className="w-[90%] lg:w-[65%] mx-auto grid grid-cols-1  ">
            <div className="py-[120px] flex flex-col gap-5">
              <p className="font-[Fredoka] text-white text-2xl">
                {data.name}'s Team !
              </p>
              <div className="flex flex-col gap-10">
                {isLoading ? (
                  <>
                    <Loader></Loader>
                  </>
                ) : (
                  <>
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 " ref={componentRef}>
                    {data.teamMember?.map((e) => {
                  return (
                    <>
                    <div className="flex flex-col justify-center gap-5">
                    <div className="flex font-[Fredoka]  flex-col items-start gap-5  bg-[#081F4D] border-white  border-2 py-5 lg:px-5 px-3 rounded-lg shadow-md shadow-white mx-auto" >
                        <div className="flex flex-col gap-5 text-white">
                          <p className="font-[Fredoka]  text-center font-bold text-xl lg:text-2xl  text-[#fbe072]">
                            DEPARTMENT OF COMPUTER SCIENCE
                          </p>
                          <div className=" flex flex-col items-center gap-0">
                            <p className="font-[Poppins] font-medium text-base lg:text-lg text-center">
                              St. Joseph's College (Autonomous)
                            </p>
                          </div>
                          <p className="text-3xl text-center font-[Stylish] ">
                            WebSprint'25
                          </p>
                        </div>
                        <div className="grid grid-cols-1 justify-start items-center w-[90%] gap-3 mx-auto text-white">
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
                       
                        
                      </div>
                     
                    </div>
                      
                      
                    </>
                  );
                })}
                 <button
                        onClick={generatePDF}
                        className="px-5 py-2 border-white border shadow-white shadow-md text-white font-[Fredoka] rounded-lg"
                      >
                        Click to get your ID
                      </button>
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

export default AdminTeam;
