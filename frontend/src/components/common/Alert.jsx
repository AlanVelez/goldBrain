import React, { useEffect } from "react";

const Alert = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-10 right-4 z-50 ${
        type === "success"
          ? "bg-green-100 border-green-400 text-green-700"
          : "bg-red-100 border-red-400 text-red-700"
      } border px-6 py-4 rounded-lg shadow-lg flex items-center`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      <button
        type="button"
        className="ml-4 text-lg font-bold"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;
