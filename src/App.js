import React, { useState } from 'react';
import { generateHtmlPage } from './utils/generateHtml';
import ConfigForm from './components/ConfigForm';
import PreviewAndShare from './components/PreviewAndShare';
import './App.css';

function App() {
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateSurprise = async (formData) => {
    setIsLoading(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    setConfig(formData);
    setIsLoading(false);
  };

  const handleBackToForm = () => {
    setConfig(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-pink-600">Creating your surprise...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {!config ? (
        <div className="max-w-4xl mx-auto p-4 py-12">
          <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">
            Create a Romantic Surprise
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Fill out the form below to create a beautiful, personalized webpage for someone special.
            When you're done, you'll get a unique link to share with them.
          </p>
          <ConfigForm onSubmit={handleCreateSurprise} />
        </div>
      ) : (
        <PreviewAndShare formData={config} onBack={handleBackToForm} />
      )}
    </div>
  );
}

export default App;
