import React, { useState } from 'react';
import { useFormik } from 'formik';

const baseURL = 'http://localhost:5000';

const EditModalDetails = ({ EmpById, setEditModal }) => {
  const [Loading, setLoading] = useState(false);

  const handleEdit = async (values) => {
    setLoading(true);

    try {
      const res = await fetch(`${baseURL}/employee/${EmpById._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error('Failed to update employee');
      }

      const data = await res.text();
      console.log(data);

      setLoading(false);
      setEditModal(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: EmpById.firstname || '',
      lastname: EmpById.lastname || '',
      email: EmpById.email || '',
      phone: EmpById.phone || '',
      job: EmpById.job || '',
      dateOfJoining: EmpById.dateOfJoining || '',
      image: EmpById.image || '',
    },
    onSubmit: (values) => {
      handleEdit(values);
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Edit Employee</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-3">
            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                className="w-full p-2 border rounded"
                onChange={formik.handleChange}
                value={formik.values.firstname}
                required
              />
            </div>

            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                className="w-full p-2 border rounded"
                onChange={formik.handleChange}
                value={formik.values.lastname}
                required
              />
            </div>

            <div>
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                className="w-full p-2 border rounded"
                onChange={formik.handleChange}
                value={formik.values.image}
                required
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </div>

            <div>
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                className="w-full p-2 border rounded"
                onChange={formik.handleChange}
                value={formik.values.phone}
                required
              />
            </div>

            <div>
              <label>Job Position</label>
              <input
                type="text"
                name="job"
                className="w-full p-2 border rounded"
                onChange={formik.handleChange}
                value={formik.values.job}
                required
              />
            </div>

            <div>
              <label>Date Of Joining</label>
              <input
                type="text"
                name="dateOfJoining"
                className="w-full p-2 border rounded"
                onChange={formik.handleChange}
                value={formik.values.dateOfJoining}
                required
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded"
              >
                {Loading ? 'Updating...' : 'Update Employee'}
              </button>

              <button
                type="button"
                onClick={() => setEditModal(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModalDetails;