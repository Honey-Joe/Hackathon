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
    pdf.save(data.name + " team's id.pdf");
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
                  </>
                )}
              </div>
            </div>
            <div>
              <DisplayPaymentImage userId={data._id}></DisplayPaymentImage>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminTeam;
