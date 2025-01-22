import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";

const Login = () => {
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const  [error,setError] = useState("")
    const [isLoading, setIsLoading] = useState(false);
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post(BASE_URL + "/api/users/login", data);
      setToken(response.data.token);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      if (response.data.email == "admin@mail.sjctni.edu") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
      reset();
    } catch (error) {
      setError(error.response.data.message)
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token]);

  return (
    <>
      <div className="bg-[#08123B]">
        <Layout>
          <div className="w-[90%] lg:w-[75%] mx-auto grid grid-cols-1 gap-10 py-[100px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 min-h-[80vh] items-center"
            >
              <div className="flex flex-col gap-5 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg  drop-shadow-2xl shadow-white">
                <div className="flex justify-center w-full">
                  <p className="font-[Fredoka] text-center text-2xl text-white">Welcome to WebSprint'25</p>
                </div>
                <div className="flex justify-center w-full">
                  <p className="font-[Fredoka] text-center text-xl text-white">Login</p>
                </div>

                <div className="flex gap-2  flex-col justify-center w-full">
                  <label htmlFor="name" className=" text-white">
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
                  <label htmlFor="name" className=" text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="payment"
                    id=""
                    className="border border-zinc-300 rounded-lg w-full p-2 mt-1"
                    {...register("password")}
                  />
                  <p className=" text-white">{errors?.password?.message}</p>
                </div>
                <div className="font-[Fredoka] text-red-500 text-lg">{error}</div>
                <div className=" w-full">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-2 text-white font-medium rounded-md ${
                  isLoading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none`}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
                </div>
                <Link to={"/register"}>
                  <p className=" text-start text-sm underline text-white">
                    Clink here to register
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </Layout>
      </div>
    </>
  );
};



export default Login;
