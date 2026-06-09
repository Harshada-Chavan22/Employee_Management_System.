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

      await res.text();

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl p-6 mx-4 bg-white rounded-xl shadow-2xl">
        
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Edit Employee
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Job Position
              </label>
              <input
                type="text"
                name="job"
                value={formik.values.job}
                onChange={formik.handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Date Of Joining
              </label>
              <input
                type="text"
                name="dateOfJoining"
                value={formik.values.dateOfJoining}
                onChange={formik.handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
  <label className="block mb-2 font-medium text-gray-700">
    Employee Photo
  </label>

  <input
    type="file"
    accept="image/*"
    className="w-full p-3 border rounded-lg"
    onChange={(e) => {
      const file = e.target.files[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        formik.setFieldValue("image", reader.result);
      };

      reader.readAsDataURL(file);
    }}
  />

  {formik.values.image ? (
    <img
      src={formik.values.image}
      alt="Preview"
      className="object-cover w-32 h-32 mt-4 border rounded-lg"
    />
  ) : (
    <p className="mt-2 text-sm text-gray-500">
      No image selected
    </p>
  )}
</div>
<p className="text-red-500">
  {formik.values.image ? "Image Loaded" : "Image Not Loaded"}
</p>

          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              {Loading ? 'Updating...' : 'Update Employee'}
            </button>

            <button
              type="button"
              onClick={() => setEditModal(false)}
              className="flex-1 py-3 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditModalDetails;
