import React, { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BASE_URL } from "../../BASE_URL";

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
      const response = await axios.post("http://localhost:3000/api/users", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen flex justify-center items-center h-screen my-10">
      <form
        action=""
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div className="flex gap-2  flex-col justify-center">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id=""
            className="border-black border py-1 "
            {...register("name")}
          />
          <p>{errors?.name?.message}</p>
        </div>
        <div className="flex gap-2  flex-col justify-center">
          <label htmlFor="name">email</label>
          <input
            type="email"
            name="dept"
            id=""
            className="border-black border py-1 "
            {...register("email")}
          />
          <p>{errors?.email?.message}</p>
        </div>
        <div className="flex gap-2  flex-col justify-center">
          <label htmlFor="name">department</label>
          <input
            type="text"
            name="dept"
            id=""
            className="border-black border py-1 "
            {...register("dept")}
          />
          <p>{errors?.dept?.message}</p>
        </div>
        <div className="flex gap-2  flex-col justify-center">
          <label htmlFor="name">college</label>
          <input
            type="text"
            name="college"
            id=""
            className="border-black border py-1"
            {...register("college")}
          />
          <p>{errors?.college?.message}</p>
        </div>
        <div className="flex gap-2  flex-col justify-center">
          <label htmlFor="name">contact</label>
          <input
            type="text"
            name="contact"
            id=""
            className="border-black border py-1 "
            {...register("contact")}
          />
          <p>{errors?.contact?.message}</p>
        </div>
        <div className="flex gap-2  flex-col justify-center">
          <label htmlFor="name">Create Password</label>
          <input
            type="text"
            name="payment"
            id=""
            className="border-black border py-1 "
            {...register("password")}
          />
          <p>{errors?.password?.message}</p>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
