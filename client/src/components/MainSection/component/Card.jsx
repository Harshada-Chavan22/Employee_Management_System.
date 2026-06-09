import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";


const baseURL = 'http://localhost:5000';


const Card = ({ handleEdit, handleReRender, empData }) => {

  const { firstname, lastname, job, email, image } = empData
  const [DropDown, setDropDown] = useState(false)

  
const handleDelete = async (id) => {
  try {
    const res = await fetch(`${baseURL}/employee/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    handleReRender();
  } catch (error) {
    console.log(error);
  }
};
  

  return (
  <div className="relative p-4 mb-4 transition bg-white shadow-md rounded-xl hover:shadow-lg">
    
    <div className="absolute top-4 right-4">
      <BsThreeDotsVertical
        size={20}
        className="cursor-pointer"
        onClick={() => setDropDown(!DropDown)}
      />

      {DropDown && (
        <ul
          className="absolute right-0 z-10 bg-white border rounded shadow"
          onMouseLeave={() => setDropDown(false)}
        >
          <li
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleEdit(empData._id)}
          >
            Edit
          </li>

          <li
            className="px-4 py-2 text-red-500 cursor-pointer hover:bg-gray-100"
            onClick={() => handleDelete(empData._id)}
          >
            Delete
          </li>
        </ul>
      )}
    </div>

    <div className="flex items-center gap-4">
      <img
        src={image || "https://via.placeholder.com/100"}
        alt={firstname}
        className="object-cover w-16 h-16 rounded-full"
      />

      <div>
        <h2 className="text-lg font-bold">
          {firstname} {lastname}
        </h2>

        <p className="text-gray-500">{email}</p>

        <p className="text-sm font-medium text-blue-600">
          {job}
        </p>
      </div>
    </div>
  </div>
);
}

export default Card