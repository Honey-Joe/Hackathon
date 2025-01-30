import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../BASE_URL';
import { scanner } from '../assets/asset';

function UpdatePayment({ userId }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading]  = useState(false)
  const [message,setMessage] = useState("");
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
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating payment image:', error);
      alert('Failed to update payment image');
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className=' grid grid-cols-1 overflow-hidden'>

    <div className='my-10 flex flex-col gap-5'>
      <h2 className='text-white font-[Fredoka] text-2xl'>Scan the QR code for payment update the screenshot</h2>
      <div>
        <img src={scanner} alt="" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-5 ">
        <input type="file" accept="image/*" onChange={handleFileChange} className="px-5 py-2 border-white border shadow-white shadow-md text-white font-[Fredoka] rounded-lg" />
        <button type="submit" className="px-5 py-2 border-white border shadow-white shadow-md text-white font-[Fredoka] rounded-lg">{
          isLoading? (<>Uploading...</>): (<>Upload</>)
        }</button>
      </form>
      
    </div>
    <div className='font-[Fredoka] text-xl text-white'>
        <p>{message}</p>
      </div>
    </div> 
  );
}

export default UpdatePayment;
