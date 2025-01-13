import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../BASE_URL';

function DisplayPaymentImage({ userId }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(BASE_URL+`/api/users/member/${userId}/payment`, {
          responseType: 'blob',
        });

        const imageURL = URL.createObjectURL(response.data);
        setImageSrc(imageURL);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [userId]);

  return (
    <div>
      {imageSrc ? <img src={imageSrc} alt="Payment" style={{ width: '300px' }} /> : <p>Loading...</p>}
    </div>
  );
}

export default DisplayPaymentImage;
