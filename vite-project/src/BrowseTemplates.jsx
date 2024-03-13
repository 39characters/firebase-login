// BrowseTemplates.jsx
import React from 'react';

const BrowseTemplates = ({ navigateBack }) => {
  // Assuming you have a list of templates passed as a prop
  const templates = [];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Templates</h1>
      <button
        onClick={navigateBack}
        className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        Back
      </button>
      <div className="mt-8">
        <ul className="space-y-4">
          {templates.map((template, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold">{template.name}</h2>
              <p>Workouts: {template.workouts.join(', ')}</p>
              <p>Days: {template.days.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BrowseTemplates;
