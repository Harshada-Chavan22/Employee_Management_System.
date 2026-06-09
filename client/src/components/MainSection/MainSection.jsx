import ModalPopUp from '../ModalPopUp/ModalDetails';
import EditModalDetails from '../ModalPopUp/EditModalDetails';
import Card from './component/Card';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import React, { useState, useEffect } from 'react';

const baseURL = 'http://localhost:5000';

const MainSection = ({ setEmployeeId }) => {
  const [ShowModal, setShowModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [EmpById, setEmpById] = useState({});

  const getAllEmployee = async () => {
    try {
      const res = await fetch(`${baseURL}/employee`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployeebyId = async (id) => {
    try {
      const res = await fetch(`${baseURL}/employee/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setEmpById(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;

    if (!value) {
      getAllEmployee();
      return;
    }

    try {
      const res = await fetch(
        `${baseURL}/searchemployee/${value}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    await getEmployeebyId(id);
    setEditModal(true);
  };

  const handleReRender = () => {
    getAllEmployee();
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  return (
    <>
      {ShowModal && (
        <ModalPopUp setShowModal={setShowModal} />
      )}

      {EditModal && (
        <EditModalDetails
          setEditModal={setEditModal}
          EmpById={EmpById}
        />
      )}

      <main className="flex-1 min-h-screen p-8 bg-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Employees ({employees.length})
          </h1>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center w-1/2 gap-2 p-3 bg-white border rounded-lg shadow">
            <BiSearch
              size={20}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search Employee..."
              onChange={handleSearch}
              className="w-full outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
          >
            <IoMdAdd size={20} />
            Add Employee
          </button>
        </div>

        <div className="grid gap-4">
          {employees &&
            employees.map((emp) => (
              <div
                key={emp._id}
                onClick={() => setEmployeeId(emp._id)}
              >
                <Card
                  empData={emp}
                  handleEdit={handleEdit}
                  handleReRender={handleReRender}
                />
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default MainSection;

