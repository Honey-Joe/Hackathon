import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import Loader from "../components/Loader";

function DisplayPaymentImage({ userId }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          BASE_URL + `/api/users/payment/${userId}`,
          {
            responseType: "blob",
          }
        );

        const imageURL = URL.createObjectURL(response.data);
        setImageSrc(imageURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [userId]);

  return (
    <>
      {isLoading ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <div className="mb-[200px]">
            {imageSrc ? (
              <img src={imageSrc} alt="Payment" className="" />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default DisplayPaymentImage;
