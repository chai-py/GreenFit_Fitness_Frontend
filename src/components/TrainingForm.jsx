import React, { useState } from 'react';
import axios from 'axios';
import { urls } from "../constants";

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
      days: Array.isArray(initialData?.weeklyClasses?.days) ? initialData?.weeklyClasses?.days : [],
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
    console.log('Form Data:', formData);
    const { action, id, ...data } = formData;

    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decodes the payload part of the JWT
        if (decoded.exp < Date.now() / 1000) {
          alert('Your session has expired. Please log in again.');
          return;
        }
      }

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

          {formData.action === 'update' || formData.action === 'delete' ? (
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
          ) : null}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
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
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
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
            <label className="block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
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

          {/* Weekly Classes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Weekly Classes</label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Frequency</label>
                <input
                  type="text"
                  name="frequency"
                  value={formData.weeklyClasses.frequency}
                  onChange={handleWeeklyClassChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter class frequency"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Days (comma separated)</label>
                <input
                  type="text"
                  name="days"
                  value={formData.weeklyClasses.days.join(', ')}
                  onChange={(e) => handleWeeklyClassChange({ ...e, target: { ...e.target, name: 'days', value: e.target.value.split(',').map(day => day.trim()) } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter class days"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Class Duration</label>
                <input
                  type="text"
                  name="classDuration"
                  value={formData.weeklyClasses.classDuration}
                  onChange={handleWeeklyClassChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter class duration"
                />
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Benefits</label>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Strength</label>
                <input
                  type="text"
                  name="strength"
                  value={formData.benefits.strength}
                  onChange={handleBenefitChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter strength benefit"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Balance</label>
                <input
                  type="text"
                  name="balance"
                  value={formData.benefits.balance}
                  onChange={handleBenefitChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter balance benefit"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Focus</label>
                <input
                  type="text"
                  name="focus"
                  value={formData.benefits.focus}
                  onChange={handleBenefitChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter focus benefit"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {formData.action === 'create' ? 'Create Training' : formData.action === 'update' ? 'Update Training' : 'Delete Training'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainingForm;
