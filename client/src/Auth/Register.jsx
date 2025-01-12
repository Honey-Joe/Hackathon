import React, { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BASE_URL } from "../BASE_URL";
import Navbar from "../layouts/Navbar";

const Register = () => {
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1, { message: "Enter your Name" }),
    college: z.string().min(1, { message: "Enter your College Name" }),
    dept: z.string().min(1, { message: "Enter your Department" }),
    contact : z.string().min(10,{message:"Enter correct phone number"}),
    password: z
      .string()
      .max(8, { message: "Password must contains 8 character" })
      .min(1, { message: "Enter your password" }),

    // Other fields like password can be added here
   
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const onsubmit = async (data) => {
    try {
      const response = await axios.post(BASE_URL+"/api/users/", data);
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="w-full h-screen bg-[url(https://ik.imagekit.io/HoneyJoe/Hackathon/army-robots-with-leader.jpg?updatedAt=1736657931131)] bg-cover bg-center z-0">
      {/* <Navbar/>  */}
      <div class="absolute inset-0 bg-black bg-opacity-50 -z-0 "></div>
      <div className="w-full flex justify-center items-center h-screen my-0 z-50 absolute">
        <form
          action=""
          className="flex flex-col gap-5 min-h-[80vh] items-center"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg  drop-shadow-2xl">
            <div className="flex gap-2 flex-col justify-center w-full">
              <label htmlFor="name" className=" text-white">Name</label>
              <input
                type="text"
                name="name"
                id=""
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                {...register("name")} required
              />
              <p>{errors?.name?.message}</p>
            </div>
            <div className="flex gap-2  flex-col justify-center w-full">
              <label htmlFor="name" className=" text-white">Email</label>
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
              <label htmlFor="name" className=" text-white">Department</label>
              <input
                type="text"
                name="dept"
                id=""
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                {...register("dept")}
              />
              <p>{errors?.dept?.message}</p>
            </div>
            <div className="flex gap-2  flex-col justify-center w-full">
              <label htmlFor="name" className=" text-white">College</label>
              <input
                type="text"
                name="college"
                id=""
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                {...register("college")}
              />
              <p>{errors?.college?.message}</p>
            </div>
            <div className="flex gap-2  flex-col justify-center w-full">
              <label htmlFor="name" className=" text-white">Contact</label>
              <input
                type="text"
                name="contact"
                id=""
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                {...register("contact")}
              />
              <p>{errors?.contact?.message}</p>
            </div>
            <div className="flex gap-2  flex-col justify-center w-full">
              <label htmlFor="name" className=" text-white">Create Password</label>
              <input
                type="text"
                name="payment"
                id=""
                className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                {...register("password")}
              />
              <p className=" text-white">{errors?.password?.message}</p>
            </div>

            <div className=" w-full">
              <button type="submit" className=' bg-blue-800 w-full text-white py-2 rounded-md text-base'>Submit</button>
            </div>

            <Link to={"/login"}>
              <p className=" text-white font-bold">Click here to Login </p>
            </Link>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
