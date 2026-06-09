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

      const data = await res.json();
      console.log(data);

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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div>New Employee Details</div>
        </div>

        <div>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstname"
              required
              onChange={formik.handleChange}
              value={formik.values.firstname}
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastname"
              required
              onChange={formik.handleChange}
              value={formik.values.lastname}
            />
          </div>

          <div>
            <label>Image</label>
            <input
              type="text"
              name="image"
              required
              onChange={formik.handleChange}
              value={formik.values.image}
            />
          </div>

          <div>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              required
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>

          <div>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              required
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </div>

          <div>
            <label>Job Position</label>
            <input
              type="text"
              name="job"
              required
              onChange={formik.handleChange}
              value={formik.values.job}
            />
          </div>

          <div>
            <label>Date Of Joining</label>
            <input
              type="text"
              name="dateOfJoining"
              required
              onChange={formik.handleChange}
              value={formik.values.dateOfJoining}
            />
          </div>

          <div>
            <button type="submit">
              {Loading ? 'Saving...' : 'Save Details'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModalDetails;