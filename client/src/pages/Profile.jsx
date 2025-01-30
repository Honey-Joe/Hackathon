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
import WhatsAppJoinButton from "../components/WhatsAppJoin";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
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
        <div className="w-[90%] lg:w-[70%] mx-auto py-[150px] grid grid-cols-1 gap-5">
          <div className="flex justify-between gap-3 flex-wrap">
            <div className="flex flex-col  text-white gap-2 font-[Fredoka]">
              <p className="text-3xl">Hi {user.name} !</p>
              <p>Your team Id is {user.teamId}</p>
              <p className="text-2xl font-semibold">Register yourself to get ID card for yourself.</p>
              <p className="text-xl">Bring the ID Card on event day as softcopy and also as photo copy</p>
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
                        Department No.
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
                Add Participants
              </button>
            </Pane>
          </div>
          <Team></Team>
          <div>
            <p className="font-[Fredoka] text-white text-xl">Update will be post on the WhatsApp group</p>
          </div>
          <WhatsAppJoinButton></WhatsAppJoinButton>
          <div className="font-[Fredoka] text-white text-lg">
            {user.payment?.image?.data?(<>You're Already Registerd</>):(<></>)}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
