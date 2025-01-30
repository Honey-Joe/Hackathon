import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../BASE_URL";
import { Button, Dialog, Pane } from "evergreen-ui";

const DeleteTeam = ({ userId }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [isShown,setIsShown]= useState(false) 

  const deleteTeam = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(BASE_URL + "/api/users/" + userId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
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
      <Pane>
        <Dialog
          isShown={isShown}
          title="Dialog title"
          intent="danger"
          onCloseComplete={() => setIsShown(false)}
          confirmLabel="Delete"
          onConfirm={deleteTeam}
        >
          Are you sure you want to delete this team?
        </Dialog>

        <button onClick={() => setIsShown(true)} className="bg-red-600 text-white px-3 py-2 rounded-lg">Delete this Team</button>
      </Pane>
      <p>{data ? data.message : <></>}</p>
      <p>{error ? error : <></>}</p>
    </div>
  );
};

export default DeleteTeam;
