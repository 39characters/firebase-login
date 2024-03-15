import React, { useState, useEffect } from 'react';
import "./firebase/config"
import { getFirestore, addDoc, collection } from "firebase/firestore"; 


const CreateTemplate = ({ navigateBack }) => {
  const [workouts, setWorkouts] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [workoutNames, setWorkoutNames] = useState([]);
  const [workoutSets, setWorkoutSets] = useState([]);
  const [workoutReps, setWorkoutReps] = useState([]);
  const [workoutWeights, setWorkoutWeights] = useState([]);
  const [workoutWeightUnits, setWorkoutWeightUnits] = useState([]);

  const db = getFirestore();

  useEffect(() => {
    if (workouts.length === 0) {
      handleAddWorkout();
    }
  }, []);

  const handleAddWorkout = () => {
    setWorkouts([...workouts, { name: '', sets: '', reps: '', weight: '', weightUnit: 'lbs' }]);
    setWorkoutNames([...workoutNames, '']);
    setWorkoutSets([...workoutSets, '']);
    setWorkoutReps([...workoutReps, '']);
    setWorkoutWeights([...workoutWeights, '']);
    setWorkoutWeightUnits([...workoutWeightUnits, 'lbs']);
  };

  const handleRemoveWorkout = (index) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);

    const updatedNames = [...workoutNames];
    updatedNames.splice(index, 1);
    setWorkoutNames(updatedNames);

    const updatedSets = [...workoutSets];
    updatedSets.splice(index, 1);
    setWorkoutSets(updatedSets);

    const updatedReps = [...workoutReps];
    updatedReps.splice(index, 1);
    setWorkoutReps(updatedReps);

    const updatedWeights = [...workoutWeights];
    updatedWeights.splice(index, 1);
    setWorkoutWeights(updatedWeights);

    const updatedWeightUnits = [...workoutWeightUnits];
    updatedWeightUnits.splice(index, 1);
    setWorkoutWeightUnits(updatedWeightUnits);
  };

  const handleWorkoutChange = (index, key, value) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index][key] = value;
    setWorkouts(updatedWorkouts);

    switch (key) {
      case 'name':
        const updatedNames = [...workoutNames];
        updatedNames[index] = value;
        setWorkoutNames(updatedNames);
        break;
      case 'sets':
        const updatedSets = [...workoutSets];
        updatedSets[index] = value;
        setWorkoutSets(updatedSets);
        break;
      case 'reps':
        const updatedReps = [...workoutReps];
        updatedReps[index] = value;
        setWorkoutReps(updatedReps);
        break;
      case 'weight':
        const updatedWeights = [...workoutWeights];
        updatedWeights[index] = value;
        setWorkoutWeights(updatedWeights);
        break;
      case 'weightUnit':
        const updatedWeightUnits = [...workoutWeightUnits];
        updatedWeightUnits[index] = value;
        setWorkoutWeightUnits(updatedWeightUnits);
        break;
      default:
        break;
    }
  };

  const handleAddTemplate = async () => {
    try {
      console.log("Adding template to Firestore...");
      const templateDocRef = await addDoc(collection(db, "templateDatabase"), {
        templateName: templateName,
        workouts: workouts.map((workout, index) => ({
          workoutName: workoutNames[index],
          workoutSets: workoutSets[index],
          workoutReps: workoutReps[index],
          workoutWeight: workoutWeights[index],
          workoutWeightType: workoutWeightUnits[index],
        })),
      });
      console.log("Document written with ID: ", templateDocRef.id);
      console.log("Template added successfully!");
      alert("Document written to Database");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="block w-full mb-4 p-2 border rounded-md mx-auto"
          style={{ maxWidth: '400px' }}
        />
        {workouts.map((workout, index) => (
          <div key={index} className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Workout Name"
              value={workoutNames[index]}
              onChange={(e) => handleWorkoutChange(index, 'name', e.target.value)}
              className="block w-full mb-2 p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Sets"
              value={workoutSets[index]}
              onChange={(e) => handleWorkoutChange(index, 'sets', e.target.value)}
              className="block w-full mb-2 p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Reps"
              value={workoutReps[index]}
              onChange={(e) => handleWorkoutChange(index, 'reps', e.target.value)}
              className="block w-full mb-2 p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Weight"
              value={workoutWeights[index]}
              onChange={(e) => handleWorkoutChange(index, 'weight', e.target.value)}
              className="block w-full mb-2 p-2 border rounded-md"
            />
            <select
              value={workoutWeightUnits[index]}
              onChange={(e) => handleWorkoutChange(index, 'weightUnit', e.target.value)}
              className="block w-full p-2 border rounded-md"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
            {workouts.length > 1 && (
              <button
                onClick={() => handleRemoveWorkout(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mx-auto mt-2"
                style={{ display: 'block', maxWidth: '200px' }}
              >
                Remove Workout
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleAddWorkout}
          className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700 mx-auto"
          style={{ display: 'block', maxWidth: '200px' }}
        >
          Add Workout
        </button>
  
        <button
          onClick={handleAddTemplate}
          className="bg-slate-900 text-white px-4 py-2 mt-8 rounded-md hover:bg-slate-700 mx-auto"
          style={{ display: 'block', maxWidth: '200px' }}
        >
          Save Template
        </button>
      </div>
    </div>
  );
};

export default CreateTemplate;