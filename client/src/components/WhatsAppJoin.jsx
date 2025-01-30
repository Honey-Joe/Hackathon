import React from "react";

const WhatsAppJoinButton = () => {
  const groupLink = "https://chat.whatsapp.com/L9BhdKuHo8p1LzheIJkApG"; // Replace with your actual WhatsApp group link

  return (
    <button
      onClick={() => window.open(groupLink, "_blank")}
      className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"
    >
      Join WhatsApp Group
    </button>
  );
};

export default WhatsAppJoinButton;
