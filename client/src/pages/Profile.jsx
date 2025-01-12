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
  const [data,setData] = useState([])
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
  const token = localStorage.getItem("token")

  const onsubmit = async (data) => {
    setData(data)
    try {
      const response = await axios.post(
        BASE_URL + "/api/users/member/" + user.id + "/team",
        data,{
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      reset();
      alert(data.name+" is registerd")
    } catch (error) {
      alert("Sorry Not Registerd")
    }
  };
  return (
    <div>
      <Layout>
        <form
          action=""
          className="flex flex-col py-[100px] gap-5 min-h-[80vh] items-center bg-blue-950"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg  drop-shadow-2xl">
            <div className="flex gap-2 flex-col justify-center w-full">
              <label htmlFor="name" className=" text-black">
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
              <label htmlFor="name" className=" text-black">
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
              <label htmlFor="name" className=" text-black">
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
              <label htmlFor="name" className=" text-black">
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
                className=" bg-blue-800 w-full text-black py-2 rounded-md text-base"
              >
                Submit
              </button>
            </div>

            <Link to={"/login"}>
              <p className=" text-black font-bold">Click here to Login </p>
            </Link>

            <Link to={"/profile/team"} className="text-black">Click here to see the registerd team</Link>
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default Profile;
