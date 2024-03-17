import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import "./firebase/config";
import Swal from 'sweetalert2';

const BrowseTemplates = ({ navigateBack }) => {
  const db = getFirestore();
  const [templates, setTemplates] = useState([]);
  const [editableTemplateId, setEditableTemplateId] = useState(null);
  const [originalTemplates, setOriginalTemplates] = useState([]); // Store the original templates state

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "templateDatabase"));
        const fetchedTemplates = [];
        querySnapshot.forEach((doc) => {
          fetchedTemplates.push({ id: doc.id, ...doc.data() });
        });
        setTemplates(fetchedTemplates);
        setOriginalTemplates(fetchedTemplates); // Initialize original templates state
      } catch (e) {
        console.error("Error fetching templates: ", e);
      }
    };

    fetchTemplates();
  }, []);

  const handleEditWorkout = (workoutIndex, key, value) => {
    const updatedTemplates = [...templates];
    const templateIndex = updatedTemplates.findIndex((template) => template.id === editableTemplateId);
    if (workoutIndex !== null) {
      updatedTemplates[templateIndex].workouts[workoutIndex][key] = value;
    } else {
      updatedTemplates[templateIndex][key] = value;
    }
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
      await updateDoc(templateRef, { workouts: template.workouts, templateName: template.templateName });
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

  const handleCancelEdit = async () => {
    setEditableTemplateId(null);
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

  const handleAddWorkout = () => {
    const updatedTemplates = [...templates];
    const templateIndex = updatedTemplates.findIndex((template) => template.id === editableTemplateId);
    updatedTemplates[templateIndex].workouts.push({
      workoutName: '',
      workoutSets: 0,
      workoutReps: 0,
      workoutWeight: 0,
      workoutWeightType: 'lbs', // Default weight type
    });
    setTemplates(updatedTemplates);
  };

  const handleDeleteTemplate = async (templateId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action is irreversible. The template will be deleted permanently and cannot be retrieved.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#80',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const templateRef = doc(db, "templateDatabase", templateId);
        await deleteDoc(templateRef);
        console.log("Template deleted successfully!");
        // Update the templates list after deletion
        const updatedTemplates = templates.filter((template) => template.id !== templateId);
        setTemplates(updatedTemplates);
        Swal.fire('Deleted!', 'The template has been deleted.', 'success');
      } catch (e) {
        console.error("Error deleting template: ", e);
        Swal.fire('Error', 'An error occurred while deleting the template.', 'error');
      }
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

                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 flex items-center justify-between absolute top-2 right-24"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 6a1 1 0 011-1h8a1 1 0 011 1v1h2a1 1 0 110 2h-1v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8H4a1 1 0 110-2h2V6zm3-2h4v1H8V4zm3 6a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1zm-3 6a1 1 0 001 1h4a1 1 0 100-2H8a1 1 0 00-1 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="flex items-center">Delete Template</span>
                </button>
                {}
                <div className="flex items-center">
                  <input
                    type="text"
                    value={template.templateName}
                    onChange={(e) => handleEditWorkout(null, 'templateName', e.target.value)}
                    className="border rounded-md p-1 mr-2 w-1/3"
                  />
                  <button
                    onClick={handleAddWorkout}
                    className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 flex items-center"
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
                    <span>Add Workout</span>
                  </button>
                </div>
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
            {editableTemplateId !== template.id && (
              <h2 className="text-xl font-bold">{template.templateName}</h2>
            )}
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
