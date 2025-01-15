import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../BASE_URL";

const DeleteTeamMember = ({ userId, memberId }) => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const deleteMember = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        BASE_URL + "/api/users/member/" + userId + "/team/" + memberId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setData(response.data);
      window.location.reload();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button className="px-3 py-2 border-2  rounded-lg text-white font-[Fredoka] bg-red-600" onClick={deleteMember}>
        {isLoading ? <>Deleting</> : <>Delete this Member !</>}
      </button>
      {data? (<>{data.message}</>):<>{error?<>{error}</>:<></>}</>}
    </div>
  );
};

export default DeleteTeamMember;
