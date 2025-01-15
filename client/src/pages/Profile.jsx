import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../BASE_URL";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { scanner } from "../assets/asset";

import Layout from "../layouts/Layout";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Team from "./Team";
import { Button, Dialog, Pane } from "evergreen-ui";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [teamMembers, setTeamMembers] = useState(null);

  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1, { message: "Enter your Name" }),
    degree: z.string().min(1, { message: "Enter your Department" }),
    contact: z.string().min(10, { message: "Enter correct phone number" }),

    // Other fields like password can be added here
  });
  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!file) {
      setIsSubmitting(false);
      setMessage("Please upload the File");
    }

    const formData = new FormData();
    formData.append("paymentImage", file);

    try {
      const response = await axios.put(
        BASE_URL + `/api/users/payment/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    setIsLoading(true);
    setError("");
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
      setData(data.name + " is Registered !");
      reset();
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-blue-950">
      <Layout>
        <ScrollToTopButton></ScrollToTopButton>
        <div className="w-[90%] lg:w-[70%] mx-auto py-[150px] grid grid-cols-1 lg:grid-cols-2  gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col  text-white gap-2 font-[Fredoka]">
              <p className="text-3xl">Hi {user.name} !</p>
              <p>Please fill this form to register your team mates </p>
              <p>
                Note: Please include yourself and once you registered your team
                member you can't reverse it{" "}
              </p>
              <p>For any clarification contact us !</p>
            </div>

            <Pane>
              <Dialog
                isShown={isShown}
                title="Add your team mate !"
                onCloseComplete={() => setIsShown(false)}
                confirmLabel="Custom Label"
                hasFooter={false}
              >
                <form
                  action=""
                  className="flex flex-col  gap-5   "
                  onSubmit={handleSubmit(onsubmit)}
                >
                  <div className="flex flex-col gap-3  items-start p-8  border rounded-xl text-zinc-600 text-sm shadow-lg  drop-shadow-2xl">
                    <div className="flex gap-2 flex-col justify-center w-full  font-[Fredoka]">
                      <label htmlFor="name" className="  font-[Fredoka]">
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
                      <label htmlFor="name" className="  font-[Fredoka]">
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
                      <label htmlFor="name" className="  font-[Fredoka]">
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
                      <label htmlFor="name" className="  font-[Fredoka]">
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
                        disabled={isLoading}
                        className={`w-full px-4 py-2 text-white font-medium rounded-md ${
                          isLoading
                            ? "bg-blue-300"
                            : "bg-blue-600 hover:bg-blue-700"
                        } focus:outline-none`}
                      >
                        {isLoading ? "Registering... " : "Register"}
                      </button>
                    </div>
                    <div className="font-[Fredoka] text-red-500 text-lg">
                      {error}
                    </div>
                    <div>
                      <p className=" font-[Fredoka]">{data}</p>
                    </div>
                  </div>
                </form>
              </Dialog>
              <button
                className="px-5 py-2 text-white font-[Fredoka] border-2 border-white shadow-md shadow-white rounded-lg"
                onClick={() => setIsShown(true)}
              >
                Add Team member
              </button>
            </Pane>
          </div>
          <Team></Team>
          <div className=" lg:col-span-2">
            <form
              action=""
              onSubmit={handelSubmit}
              className="flex flex-col gap-5"
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
                disabled={isSubmitting}
                className={` px-4 py-2 text-white font-medium rounded-md ${
                  isLoading
                    ? "bg-blue-300"
                    : "border border-white shadow-md shadow-white px-5 py-3 text-white font-[Fredoka] rounded-lg"
                } focus:outline-none`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <div>
                <p className="font-[Fredoka] text-white text-xl">{message}</p>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
