import React, { useState } from 'react';

const ConfigForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    crushName: '',
    yourName: '',
    mainPhotoUrl: '',
    mainPhotoCaption: 'A special moment with you',
    galleryPhotos: Array(3).fill({ src: '', caption: '' }),
    handwrittenMessage: 'You mean the world to me...',
    reasons: [
      { title: 'Your Smile', description: 'It brightens my darkest days' },
      { title: 'Your Laugh', description: 'The most beautiful sound I know' },
      { title: 'Your Heart', description: 'So kind and full of love' }
    ],
    futurePlans: [
      'Go on a spontaneous adventure together',
      'Watch the sunset from a beautiful spot',
      'Create many more memories together'
    ],
    wordCloud: 'Amazing, Beautiful, Caring, Dazzling, Extraordinary, Fantastic, Gorgeous, Heartwarming, Incredible, Joyful, Kind, Loving, Marvelous, Nice, Outstanding, Perfect, Quality, Radiant, Spectacular, Terrific, Unforgettable, Valuable, Wonderful, XOXO, Yummy, Zesty',
    outroSecret: 'P.S. You mean the world to me.'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (e, index, field, subField) => {
    const newArray = [...formData[field]];
    newArray[index] = {
      ...newArray[index],
      [subField]: e.target.value
    };
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              name="yourName"
              value={formData.yourName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Their Name</label>
            <input
              type="text"
              name="crushName"
              value={formData.crushName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="The name of your special someone"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Main Photo</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input
              type="url"
              name="mainPhotoUrl"
              value={formData.mainPhotoUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="https://example.com/photo.jpg"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
            <input
              type="text"
              name="mainPhotoCaption"
              value={formData.mainPhotoCaption}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="A special moment together"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gallery Photos</h2>
        
        <div className="space-y-6">
          {formData.galleryPhotos.map((photo, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-medium text-gray-700">Photo {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="url"
                    value={photo.src || ''}
                    onChange={(e) => handleArrayChange(e, index, 'galleryPhotos', 'src')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder={`https://example.com/photo${index + 1}.jpg`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                  <input
                    type="text"
                    value={photo.caption || ''}
                    onChange={(e) => handleArrayChange(e, index, 'galleryPhotos', 'caption')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder={`Memory ${index + 1}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Message</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
          <textarea
            name="handwrittenMessage"
            value={formData.handwrittenMessage}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-handwriting text-xl"
            placeholder="Write a heartfelt message..."
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reasons You're Amazing</h2>
        
        <div className="space-y-6">
          {formData.reasons.map((reason, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-medium text-gray-700">Reason {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={reason.title}
                    onChange={(e) => handleArrayChange(e, index, 'reasons', 'title')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., Your Smile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={reason.description}
                    onChange={(e) => handleArrayChange(e, index, 'reasons', 'description')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Why this is special to you"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-8 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Create My Surprise
        </button>
      </div>
    </form>
  );
};

export default ConfigForm;
