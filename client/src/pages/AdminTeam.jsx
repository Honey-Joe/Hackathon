import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../BASE_URL";
import { useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import DisplayPaymentImage from "./TeamImage";

const AdminTeam = () => {
  const id = useParams();
  const token = localStorage.getItem("token");
  const [imageSrc, setImageSrc] = useState(null);

  const [data, setData] = useState([]);
  const fetchdata = async () => {
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
      console.log(error);
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
          <div className="w-[90%] lg:w-[65%] mx-auto grid grid-cols-1 h-screen ">
            <div className="py-[120px] flex flex-col gap-5">
              <p className="font-[Fredoka] text-white text-2xl">
                {data.name}'s Team !
              </p>
              <div className="flex flex-col gap-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {data.teamMember?.map((e) => {
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
                            <p>Contact:</p>
                            {e.contact}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-5 flex-col items-center">
                  <h2 className="font-[Fredoka] text-white ">Payment Image</h2>
                    <DisplayPaymentImage userId={data._id}></DisplayPaymentImage>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminTeam;
