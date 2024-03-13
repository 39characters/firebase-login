// CreateTemplate.jsx
import React, { useState } from 'react';

const CreateTemplate = ({ navigateBack }) => {
  const [name, setName] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [days, setDays] = useState([false, false, false, false, false, false, false]); // Array to track which days are selected
  const [weightUnit, setWeightUnit] = useState('lbs');

  const handleAddWorkout = () => {
    setWorkouts([...workouts, { name: '', sets: '', reps: '', weight: '', weightUnit }]);
  };

  const handleWorkoutChange = (index, key, value) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index][key] = value;
    setWorkouts(updatedWorkouts);
  };

  const handleToggleDay = (index) => {
    const updatedDays = [...days];
    updatedDays[index] = !updatedDays[index];
    setDays(updatedDays);
  };

  const handleAddTemplate = () => {
    // Implement the logic to add the template to Firebase or wherever you are storing the data
    // For now, let's just log the template data
    console.log({ name, workouts, days });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create Template</h1>
      <button
        onClick={navigateBack}
        className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        Back
      </button>
      <div className="mt-8">
        <input
          type="text"
          placeholder="Template Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mb-4 p-2 border rounded-md"
        />
        {workouts.map((workout, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Workout Name"
              value={workout.name}
              onChange={(e) => handleWorkoutChange(index, 'name', e.target.value)}
              className="block w-full mb-2 p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Sets"
              value={workout.sets}
              onChange={(e) => handleWorkoutChange(index, 'sets', e.target.value)}
              className="block w-full mb-2 p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Reps"
              value={workout.reps}
              onChange={(e) => handleWorkoutChange(index, 'reps', e.target.value)}
              className="block w-full mb-2 p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Weight"
              value={workout.weight}
              onChange={(e) => handleWorkoutChange(index, 'weight', e.target.value)}
              className="block w-full mb-2 p-2 border rounded-md"
            />
            <select
              value={workout.weightUnit}
              onChange={(e) => handleWorkoutChange(index, 'weightUnit', e.target.value)}
              className="block w-full p-2 border rounded-md"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>
        ))}
        <button
          onClick={handleAddWorkout}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Workout
        </button>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Select Days:</h2>
          <div className="flex space-x-4">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <button
                key={index}
                onClick={() => handleToggleDay(index)}
                className={`px-4 py-2 rounded-md shadow-md focus:outline-none ${
                  days[index] ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleAddTemplate}
          className="bg-blue-500 text-white px-4 py-2 mt-8 rounded-md hover:bg-blue-600"
        >
          Save Template
        </button>
      </div>
    </div>
  );
};

export default CreateTemplate;
