import ModalPopUp from '../ModalPopUp/ModalDetails'
import EditModalDetails from '../ModalPopUp/EditModalDetails'
import Card from './component/Card'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import React, { useState, useEffect } from 'react'


const baseURL = 'http://localhost:5000';


const MainSection = ({ setEmployeeId }) => {

  const [ShowModal, setShowModal] = useState(false)
  const [EditModal, setEditModal] = useState(false)
  const [employees, setEmployees] = useState([])
  const [EmpById, setEmpById] = useState([])
  const [ReRender, setReRender] = useState(false)

  const getAllEmployee = async () => {
    try {
        const res = await fetch(`${baseURL}/employee`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json(); 
        setEmployees(data);
    } catch (error) {
        console.log(error);
    }
  }

  const getEmployeebyId = async (id) => {
    try {
        const res = await fetch(`${baseURL}/employee/${id}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json(); 
        setEmpById(data);
    } catch (error) {
        console.log(error);
    }
  }

  const handleSearch = async (e) => {
    try {
        const res = await fetch(`${baseURL}/searchemployee/${e.target.value}`, { // Include the base URL
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json(); 
        setEmployees(data);
    } catch (error) {
        console.log(error);
    }
  }

  const handleEdit = async (id) => {
    getEmployeebyId(id)
    setEditModal(true)
  }

const handleReRender = () => {
  getAllEmployee();
}

  useEffect(() => {
    getAllEmployee()
  }, [ShowModal, EditModal, ReRender])

  
  return (
    <>
    {
        ShowModal && <ModalPopUp setShowModal={setShowModal} />
    }
    {
        EditModal && <EditModalDetails setEditModal={setEditModal} EmpById={EmpById} />
    }

    <main className="p-8">
        <div>
            <div className="mb-6 text-3xl font-bold">
  People ({employees.length})
</div>
            <div>
                <div>
                    <input
  type="text"
  placeholder="Search Employee..."
  onChange={handleSearch}
  className="w-full p-3 border rounded-lg"
/>
                    <BiSearch size={20} />
                </div>
                <button
  type="button"
  onClick={() => setShowModal(true)}
  className="px-5 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
>
  Add Employee
</button>
            </div>

            <div>
                {
                employees && employees.map((emp) => {
                    return <div key={emp._id} onClick={() => setEmployeeId(emp._id)}>
                    <Card
                        empData={emp}
                        handleEdit={handleEdit}
                        handleReRender={handleReRender} />
                    </div>
                })
                }
            </div>
        </div>
    </main>
    </>
  )
}

export default MainSection