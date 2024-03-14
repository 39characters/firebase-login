import React, { useState } from 'react';

const CreateTemplate = ({ navigateBack }) => {
  const [name, setName] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const handleAddWorkout = () => {
    setWorkouts([...workouts, { name: '', sets: '', reps: '', weight: '', weightUnit: 'lbs' }]);
  };

  const handleRemoveWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);
  };

  const handleWorkoutChange = (index, key, value) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index][key] = value;
    setWorkouts(updatedWorkouts);
  };

  const handleAddTemplate = () => {
    // Implement the logic to add the template to Firebase or wherever you are storing the data
    // For now, let's just log the template data
    console.log({ name, workouts });
  };

  return (
    <div className="container mx-auto py-8">
      <button
        onClick={navigateBack}
        className="bg-slate-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-900">Create a workout template!</h1>
      
      <div className="mt-8">
        <input
          type="text"
          placeholder="Template Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mb-4 p-2 border rounded-md mx-auto"
          style={{ maxWidth: '400px' }} // Limiting the width of the input field
        />
        {workouts.map((workout, index) => (
          <div key={index} className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
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
            {workouts.length > 1 && ( // Only show the "Remove Workout" button if there's more than one workout
              <button
                onClick={() => handleRemoveWorkout(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mx-auto mt-2"
                style={{ display: 'block', maxWidth: '200px' }} // Centering the button and limiting its width
              >
                Remove Workout
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleAddWorkout}
          className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700 mx-auto"
          style={{ display: 'block', maxWidth: '200px' }} // Centering the button and limiting its width
        >
          Add Workout
        </button>

        <button
          onClick={handleAddTemplate}
          className="bg-slate-900 text-white px-4 py-2 mt-8 rounded-md hover:bg-slate-700 mx-auto"
          style={{ display: 'block', maxWidth: '200px' }} // Centering the button and limiting its width
        >
          Save Template
        </button>
      </div>
    </div>
  );
};

export default CreateTemplate;
