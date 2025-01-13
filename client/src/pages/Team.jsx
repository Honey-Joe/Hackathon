import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../BASE_URL";
import Layout from "../layouts/Layout";
import { Link } from "react-router-dom";
import { scanner } from "../assets/asset";

const Team = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchdata = async () => {
    const res = await axios.get(BASE_URL + "/api/users/member/" + user.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(res.data);
    setTeamMembers(res.data.teamMember.length);
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("paymentImage", file);

    try {
      const response = await axios.put(
        BASE_URL+`/api/users/member/${user.id}/payment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to upload payment image");
    }
  };
  useEffect(() => {
    fetchdata();
  }, [1]);

  return (
    <>
      <div className="bg-blue-950">
        <Layout>
          <div className="w-[80%] lg:w-[60%] mx-auto py-28 grid grid-cols-1 gap-5 ">
            <div className="text-white font-[Fredoka] flex flex-col gap-6">
              <p className="text-4xl">Hi {user.name} ! </p>
              <p className="">Here is your team </p>
              <p>
                Note: Don't forget to include yourself. You can add upto 3
                members{" "}
              </p>
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
                className="border border-white text-white font-[Fredoka] rounded-lg shadow-md shadow-white px-5 py-2"
              >
                {" "}
                Submit
              </button>
            </form>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Team;
