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
        src={EmpById.image || "https://via.placeholder.com/150"}
        alt=""
        className="object-cover w-32 h-32 mb-4 rounded-full"
      />

      <h2 className="text-xl font-bold">
        {EmpById.firstname} {EmpById.lastname}
      </h2>

      <p className="text-gray-500">{EmpById.email}</p>
    </div>

    <div className="mt-6 space-y-3">
      <p><strong>Phone:</strong> {EmpById.phone}</p>
      <p><strong>Job:</strong> {EmpById.job}</p>
      <p><strong>Date Joined:</strong> {EmpById.dateOfJoining}</p>
    </div>
  </div>
)
}

export default LeftBar