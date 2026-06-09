import React, { useState, useEffect } from 'react'


const baseURL = 'http://localhost:5000';


const LeftBar = ({ employeeId }) => {

    const [EmpById, setEmpById] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        job: '',
        dateOfJoining: '',
        image: ''
    })


    useEffect(() => {
        const getEmployeeById = async () => {
            try {
                const res = await fetch(`${baseURL}/employee/${employeeId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch the data.");
                }
                const data = await res.json();
                setEmpById(data);
            } catch (error) {
                console.error(error);
            }
        };
        getEmployeeById();
    }, [employeeId]);


    return (
  <div className="w-80 min-h-screen p-6 bg-white border-r shadow-lg">
    <h2 className="mb-6 text-2xl font-bold text-gray-800">
      Employee Details
    </h2>

    <div className="flex flex-col items-center">
      <img
  src={EmpById.image}
  alt="Employee"
  className="object-cover w-32 h-32 mx-auto rounded-full border-4 border-blue-500"
/>

      <h2 className="text-xl font-bold">
        {EmpById.firstname} {EmpById.lastname}
      </h2>

      <p className="text-gray-500">{EmpById.email}</p>
    </div>

    <div className="mt-8 space-y-3">
      <div className="p-3 bg-gray-100 rounded-lg">
        <strong>Phone:</strong> {EmpById.phone}
      </div>

      <div className="p-3 bg-gray-100 rounded-lg">
        <strong>Job:</strong> {EmpById.job}
      </div>

      <div className="p-3 bg-gray-100 rounded-lg">
        <strong>Date Joined:</strong> {EmpById.dateOfJoining}
      </div>
    </div>
  </div>
);
}

export default LeftBar