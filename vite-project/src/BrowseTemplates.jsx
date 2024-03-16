import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import "./firebase/config";

const BrowseTemplates = ({ navigateBack }) => {
  const db = getFirestore();
  const [templates, setTemplates] = useState([]);
  const [editableTemplateId, setEditableTemplateId] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "templateDatabase"));
        const fetchedTemplates = [];
        querySnapshot.forEach((doc) => {
          fetchedTemplates.push({ id: doc.id, ...doc.data() });
        });
        setTemplates(fetchedTemplates);
      } catch (e) {
        console.error("Error fetching templates: ", e);
      }
    };

    fetchTemplates();
  }, []);

  const handleEditWorkout = (workoutIndex, key, value) => {
    const updatedTemplates = [...templates];
    const templateIndex = updatedTemplates.findIndex((template) => template.id === editableTemplateId);
    updatedTemplates[templateIndex].workouts[workoutIndex][key] = value;
    setTemplates(updatedTemplates);
  };

  const handleRemoveWorkout = (workoutIndex) => {
    const updatedTemplates = [...templates];
    const templateIndex = updatedTemplates.findIndex((template) => template.id === editableTemplateId);
    if (updatedTemplates[templateIndex].workouts.length > 1) {
      updatedTemplates[templateIndex].workouts.splice(workoutIndex, 1);
      setTemplates(updatedTemplates);
    } else {
      alert("Cannot remove the last workout. There must be at least one workout in the template.");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const templateRef = doc(db, "templateDatabase", editableTemplateId);
      const template = templates.find((template) => template.id === editableTemplateId);
      await updateDoc(templateRef, { workouts: template.workouts });
      console.log("Template updated successfully!");
      setEditableTemplateId(null);
      alert("Template updated successfully!");
    } catch (e) {
      console.error("Error updating template: ", e);
    }
  };

  const handleEditTemplate = (templateId) => {
    setEditableTemplateId(templateId === editableTemplateId ? null : templateId);
  };

  const handleCancelEdit = () => {
    setEditableTemplateId(null);
  };

  return (
    <div className="container mx-auto py-8">
      <button
 MPSL
        onClick={navigateBack}
        className="bg-slate-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-900">Browse the templates you've created!</h1>
      
      <div className="mt-8">
        {templates.map((template) => (
          <div key={template.id} className="border rounded-md p-4 mb-4 relative">
            {editableTemplateId === template.id ? (
              <div>
                <button
  onClick={handleSaveChanges}
  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 flex items-center justify-between absolute top-2 right-2"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.293 10.293a1 1 0 011.414 0L10 15.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
  <span className="flex items-center">Save</span>
</button>

                <button
                  onClick={handleCancelEdit}
                  className="ml-auto text-gray-500 border border-gray-500 hover:border-gray-700 hover:text-gray-700 px-2.5 py-1 flex items-center rounded-xl transition-all duration-300 w-19 relative top-8 left-2"
                >
                  Cancel
                </button>


              </div>
            ) : (
              <button
  onClick={() => handleEditTemplate(template.id)}
  className="text-gray-500 hover:text-gray-700 flex items-center ml-auto"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.293 10.293a1 1 0 011.414 0L10 15.586l5.293-5.293a1 1 0 111.414 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
  Edit
</button>

            )}
            <h2 className="text-xl font-bold">{template.templateName}</h2>
            <div className="mt-2">
              {template.workouts.map((workout, index) => (
                <div key={index} className="mb-2">
                  {editableTemplateId === template.id ? (
                    <p>
                      {`Workout ${index + 1}: `}
                      <input
                        type="text"
                        value={workout.workoutName}
                        onChange={(e) => handleEditWorkout(index, 'workoutName', e.target.value)}
                        className="border rounded-md p-1"
                      />
                      {`, Sets: `}
                      <input
                        type="number"
                        value={workout.workoutSets}
                        onChange={(e) => handleEditWorkout(index, 'workoutSets', parseInt(e.target.value))}
                        className="border rounded-md p-1"
                      />
                      {`, Reps: `}
                      <input
                        type="number"
                        value={workout.workoutReps}
                        onChange={(e) => handleEditWorkout(index, 'workoutReps', parseInt(e.target.value))}
                        className="border rounded-md p-1"
                      />
                      {`, Weight: `}
                      <input
                        type="number"
                        value={workout.workoutWeight}
                        onChange={(e) => handleEditWorkout(index, 'workoutWeight', parseInt(e.target.value))}
                        className="border rounded-md p-1"
                      />
                      <select
                        value={workout.workoutWeightType}
                        onChange={(e) => handleEditWorkout(index, 'workoutWeightType', e.target.value)}
                        className="border rounded-md p-1"
                      >
                        <option value="lbs">lbs</option>
                        <option value="kg">kg</option>
                      </select>
                      <button
                        onClick={() => handleRemoveWorkout(index)}
                        className="text-red-500 ml-2"
                      >
                        Remove
                      </button>
                    </p>
                  ) : (
                    <p>{`Workout ${index + 1}: ${workout.workoutName}, Sets: ${workout.workoutSets}, Reps: ${workout.workoutReps}, Weight: ${workout.workoutWeight} ${workout.workoutWeightType}`}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTemplates;
