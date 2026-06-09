import { useFormik } from 'formik';
import React, { useState } from 'react';

const baseURL = 'http://localhost:5000';

const ModalDetails = ({ setShowModal }) => {
  const [Loading, setLoading] = useState(false);

  const createEmployee = async (values) => {
    setLoading(true);

    try {
      const res = await fetch(`${baseURL}/employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      await res.json();

      setLoading(false);
      setShowModal(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      job: '',
      dateOfJoining: '',
      image: '',
    },
    onSubmit: (values) => {
      createEmployee(values);
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-3xl p-6 mx-4 bg-white rounded-xl shadow-2xl">
        
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Add New Employee
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
                required
                onChange={formik.handleChange}
                value={formik.values.firstname}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                required
                onChange={formik.handleChange}
                value={formik.values.lastname}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                required
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Job Position
              </label>
              <input
                type="text"
                name="job"
                required
                onChange={formik.handleChange}
                value={formik.values.job}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Date Of Joining
              </label>
              <input
                type="text"
                name="dateOfJoining"
                required
                onChange={formik.handleChange}
                value={formik.values.dateOfJoining}
                placeholder="e.g. 09 July 2026"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="flex-1 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {Loading ? 'Saving...' : 'Save Employee'}
            </button>

            <button
              type="button"
              onClick={() => setShowModal(false)}
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

export default ModalDetails;

