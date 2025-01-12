import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../BASE_URL";

const Team = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const fetchdata = async () => {
    const res = await axios.get(BASE_URL + "/api/users/member/" + user.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(res.data);
  };
  useEffect(() => {
    fetchdata();
  }, [1]);
  return <div>{data.name}</div>;
};

export default Team;
