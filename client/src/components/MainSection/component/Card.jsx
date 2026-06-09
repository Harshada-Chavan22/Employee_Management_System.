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
  <div className="relative p-4 mb-4 transition-all bg-white shadow-md cursor-pointer rounded-xl hover:shadow-xl">
    
    <div className="absolute top-4 right-4">
      <BsThreeDotsVertical
        size={20}
        className="cursor-pointer"
        onClick={() => setDropDown(!DropDown)}
      />

      {DropDown && (
        <ul
          className="absolute right-0 z-10 w-32 bg-white border rounded-lg shadow-lg"
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
  src={image}
  alt={firstname}
  className="object-cover w-20 h-20 rounded-full border-2 border-blue-500"
/>

      <div>
        <h2 className="text-lg font-bold">
          {firstname} {lastname}
        </h2>

        <p className="text-gray-500">{email}</p>

        <p className="font-medium text-blue-600">
          {job}
        </p>
      </div>
    </div>
  </div>
);
}

export default Card