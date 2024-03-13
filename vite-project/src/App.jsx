// App.jsx
import React, { useState } from 'react';
import CreateTemplate from './CreateTemplates';
import BrowseTemplates from './BrowseTemplates';

function App() {
  // Define state for managing navigation
  const [currentPage, setCurrentPage] = useState('choices');

  // Function to handle navigation to the create template page
  const navigateToCreateTemplate = () => {
    setCurrentPage('create');
  };

  // Function to handle navigation to the browse templates page
  const navigateToBrowseTemplates = () => {
    setCurrentPage('browse');
  };

  // Function to handle navigation back to the choices page
  const navigateBackToChoices = () => {
    setCurrentPage('choices');
  };

  // Render different pages based on the current page
  let content;
  if (currentPage === 'create') {
    content = <CreateTemplate navigateBack={navigateBackToChoices} />;
  } else if (currentPage === 'browse') {
    content = <BrowseTemplates navigateBack={navigateBackToChoices} />;
  } else {
    content = (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Fitness Tracker</h1>
        <button
          onClick={navigateToCreateTemplate}
          className="bg-blue-500 text-white px-8 py-4 mr-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Create Template
        </button>
        <button
          onClick={navigateToBrowseTemplates}
          className="bg-gray-500 text-white px-8 py-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Browse Templates
        </button>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default App;
