import React, { useState } from 'react';
import axios from 'axios';
import { urls } from "../constants";
const userRole = localStorage.getItem("userRole");

const TrainingForm = ({ initialData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    action: 'create', // Default action
    id: initialData?.id || '', // ID field for update/delete
    name: initialData?.name || '',
    price: initialData?.price || 0,
    category: initialData?.category || '',
    imageUrl: initialData?.imageUrl || '',
    title: initialData?.title || '',
    batchStartTime: initialData?.batchStartTime || '',
    batchEndTime: initialData?.batchEndTime || '',
    weeklyClasses: {
      frequency: initialData?.weeklyClasses?.frequency || '',
      days: initialData?.weeklyClasses?.days || [],
      classDuration: initialData?.weeklyClasses?.classDuration || '',
    },
    benefits: {
      strength: initialData?.benefits?.strength || '',
      balance: initialData?.benefits?.balance || '',
      focus: initialData?.benefits?.focus || '',
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWeeklyClassChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      weeklyClasses: {
        ...formData.weeklyClasses,
        [name]: value,
      },
    });
  };

  const handleBenefitChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      benefits: {
        ...formData.benefits,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { action, id, ...data } = formData;

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('auth_token'); // Adjust based on your actual token storage
      if (!token) {
        alert('You must be logged in to submit the form.');
        return;
      }

      // Set up the headers to include the Authorization token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

    
      if (action === 'create') {
        const response = await axios.post(`${urls.url}/training`, data, { headers });
        alert('Training created successfully!');
        console.log(response.data);
      } else if (action === 'update') {
        if (!id) {
          alert('ID is required for updating training!');
          return;
        }
        const response = await axios.put(`${urls.url}/training/${id}`, data, { headers });
        alert('Training updated successfully!');
        console.log(response.data);
      } else if (action === 'delete') {
        if (!id) {
          alert('ID is required for deleting training!');
          return;
        }
        const response = await axios.delete(`${urls.url}/training/${id}`, { headers });
        alert('Training deleted successfully!');
        console.log(response.data);
      }
    } catch (error) {
      console.error('Error handling form action:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50"> 
  <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg training-form-container mt-20">
    {userRole === 'admin' && (
      <>
        <button onClick={() => setFormData({ ...formData, action: 'create' })} className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md">
          Create Training
        </button>
        <button onClick={() => setFormData({ ...formData, action: 'update' })} className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded-md">
          Edit Training
        </button>
        <button onClick={() => setFormData({ ...formData, action: 'delete' })} className="px-4 py-2 bg-red-500 text-white rounded-md">
          Delete Training
        </button>
      </>
    )}
    <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">
      {formData.action === 'create' ? 'Create New Training' : 'Edit/Delete Training'}
    </h2>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Action</label>
        <select
          name="action"
          value={formData.action}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>

          {(formData.action === 'update' || formData.action === 'delete') && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter training ID"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter training name"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter training price"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter training category"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter image URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter training title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Batch Start Time</label>
            <input
              type="datetime-local"
              name="batchStartTime"
              value={formData.batchStartTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Batch End Time</label>
            <input
              type="datetime-local"
              name="batchEndTime"
              value={formData.batchEndTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Weekly Class Frequency</label>
            <input
              type="text"
              name="weeklyClasses.frequency"
              value={formData.weeklyClasses.frequency}
              onChange={handleWeeklyClassChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter weekly class frequency"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Weekly Class Days</label>
            <input
              type="text"
              name="weeklyClasses.days"
              value={formData.weeklyClasses.days.join(', ')}
              onChange={handleWeeklyClassChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter weekly class days (comma-separated)"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Weekly Class Duration</label>
            <input
              type="text"
              name="weeklyClasses.classDuration"
              value={formData.weeklyClasses.classDuration}
              onChange={handleWeeklyClassChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter weekly class duration"
            />
          </div>
          <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Strength Benefits</label>
    <textarea
      name="benefits.strength"
      value={formData.benefits.strength}
      onChange={handleBenefitChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Enter strength benefits"
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Balance Benefits</label>
    <textarea
      name="benefits.balance"
      value={formData.benefits.balance}
      onChange={handleBenefitChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Enter balance benefits"
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Focus Benefits</label>
    <textarea
      name="benefits.focus"
      value={formData.benefits.focus}
      onChange={handleBenefitChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Enter focus benefits"
    />
  </div>

  <button
  type="submit"
  className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none transition duration-300"
>
  Submit
</button>
        </form>
      </div>
    </div>
  );
};

export default TrainingForm;
