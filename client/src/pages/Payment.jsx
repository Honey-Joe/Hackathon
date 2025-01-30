import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../BASE_URL';
import { scanner } from '../assets/asset';

function UpdatePayment({ userId }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading]  = useState(false)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select an image!');

    const formData = new FormData();
    formData.append('paymentImage', file);
    setIsLoading(true)
    try {
      const response = await axios.put(BASE_URL+`/api/users/payment/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error updating payment image:', error);
      alert('Failed to update payment image');
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className='my-10 flex flex-col gap-5'>
      <h2 className='text-white font-[Fredoka] text-2xl'>Scan the QR code update the screenshot</h2>
      <div>
        <img src={scanner} alt="" />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-5 flex-wrap ">
        <input type="file" accept="image/*" onChange={handleFileChange} className="text-white px-5 py-5 border border-white rounded-lg " />
        <button type="submit" className='font-[Fredoka] text-white border border-white rounded-lg px-7 py-5'>{
          isLoading? (<>Uploading...</>): (<>Upload</>)
        }</button>
      </form>
    </div>
  );
}

export default UpdatePayment;
