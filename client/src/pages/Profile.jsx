import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../BASE_URL";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [error , setError] = useState(null)
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1, { message: "Enter your Name" }),
    degree: z.string().min(1, { message: "Enter your Department" }),
    contact: z.string().min(10, { message: "Enter correct phone number" }),

    // Other fields like password can be added here
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const token = localStorage.getItem("token");

  const onsubmit = async (data) => {
    try {
      const response = await axios.post(
        BASE_URL + "/api/users/member/" + user.id + "/team",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data)
      alert("Registered")
      reset();
    } catch (error) {
      setError(error.response.data.message)
    }
  };
  return (
    <div className="bg-blue-950">
      <Layout>
        <form
          action=""
          className="flex flex-col py-[150px] gap-5  w-[90%] lg:w-[60%] mx-auto "
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className="flex flex-col text-white gap-2 font-[Fredoka]">
            <p className="text-3xl">Hi {user.name} !</p>
            <p>Please fill this form to register your team mates </p>
            <p>Note: Please include yourself and once you registered your team member you can't reverse it </p>
            <p>For any clarification contact us !</p>
          </div>
          <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg  drop-shadow-2xl">
            <div className="flex gap-2 flex-col justify-center w-full  font-[Fredoka]">
              <label htmlFor="name" className=" text-white font-[Fredoka]">
                Name
              </label>
              <input
                type="text"
                name="name"
                id=""
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                {...register("name")}
                required
              />
              <p>{errors?.name?.message}</p>
            </div>
            <div className="flex gap-2  flex-col justify-center w-full">
              <label htmlFor="name" className=" text-white font-[Fredoka]">
                Email
              </label>
              <input
                type="email"
                name="dept"
                id=""
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                {...register("email")}
              />
              <p>{errors?.email?.message}</p>
            </div>
            <div className="flex gap-2  flex-col justify-center w-full">
              <label htmlFor="name" className=" text-white font-[Fredoka]">
                Department
              </label>
              <input
                type="text"
                name="dept"
                id=""
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                {...register("degree")}
              />
              <p>{errors?.dept?.message}</p>
            </div>

            <div className="flex gap-2  flex-col justify-center w-full">
              <label htmlFor="name" className=" text-white font-[Fredoka]">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                id=""
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                {...register("contact")}
              />
              <p>{errors?.contact?.message}</p>
            </div>

            <div className=" w-full">
              <button
                type="submit"
                className=" bg-blue-800 w-full text-white py-2 rounded-md text-base"
              >
                Register
              </button>
            </div>
            <div>
              {error ? (<><p className="text-white font-[Fredoka] text-nowrap">{error}</p></>): (<><p className={data.name===undefined?("hidden"):("text-white font-[Fredoka] block")}>{data.name+" is registered !"}</p></>)}
              
            </div>

            

            <Link to={"/profile/team"} className="px-5 py-2 border border-white rounded-lg shadow-md shadow-white font-[Fredoka] text-white">
              Click here to see the added team members
            </Link>
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default Profile;
