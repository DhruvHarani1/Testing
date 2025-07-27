import React, { useState } from 'react';

const ConfigForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic Information
    crushName: '',
    yourName: '',
    
    // Main Photo
    mainPhoto: null,
    mainPhotoPreview: '',
    mainPhotoCaption: 'A special moment with you',
    
    // Gallery Photos
    galleryPhotos: Array(6).fill({ file: null, preview: '', caption: '' }),
    
    // Handwritten Message
    handwrittenMessage: 'You mean the world to me...',
    
    // Quiz Section
    quiz: {
      question: 'How much do you love me?',
      options: [
        'A little',
        'A lot',
        'To the moon and back',
        'More than anything'
      ]
    },
    
    // Reasons Section
    reasons: [
      { title: 'Your Smile', description: 'It brightens my darkest days' },
      { title: 'Your Laugh', description: 'The most beautiful sound I know' },
      { title: 'Your Heart', description: 'So kind and full of love' }
    ],
    
    // Spotify Playlist
    spotifyPlaylist: '',
    
    // Map Locations
    mapLocations: [
      { name: 'Where we first met', address: '' },
      { name: 'Our favorite place', address: '' },
      { name: 'Future dream location', address: '' }
    ],
    
    // Future Plans
    futurePlans: [
      'Go on a spontaneous adventure together',
      'Watch the sunset from a beautiful spot',
      'Create many more memories together'
    ],
    
    // Word Cloud
    wordCloud: 'Amazing, Beautiful, Caring, Dazzling, Extraordinary, Fantastic, Gorgeous, Heartwarming, Incredible, Joyful, Kind, Loving, Marvelous, Nice, Outstanding, Perfect, Quality, Radiant, Spectacular, Terrific, Unforgettable, Valuable, Wonderful, XOXO, Yummy, Zesty',
    
    // Reminder Reel (for video uploads)
    reminderReel: [],
    
    // Time Capsule
    timeCapsule: {
      unlockDate: '',
      message: 'A special message for the future...'
    },
    
    // Outro Secret
    outroSecret: 'P.S. You mean the world to me.'
  });

  // Handle text/select input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle nested object changes (like quiz, timeCapsule)
  const handleNestedChange = (e, parent, field) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: e.target.value
      }
    }));
  };

  // Handle array field changes (reasons, futurePlans, etc.)
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

  // Handle main photo upload
  const handleMainPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          mainPhoto: file,
          mainPhotoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery photo upload
  const handleGalleryPhotoUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newGalleryPhotos = [...formData.galleryPhotos];
        newGalleryPhotos[index] = {
          ...newGalleryPhotos[index],
          file: file,
          preview: reader.result
        };
        setFormData(prev => ({
          ...prev,
          galleryPhotos: newGalleryPhotos
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding a new quiz option
  const addQuizOption = () => {
    setFormData(prev => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        options: [...prev.quiz.options, '']
      }
    }));
  };

  // Handle quiz option change
  const handleQuizOptionChange = (e, index) => {
    const newOptions = [...formData.quiz.options];
    newOptions[index] = e.target.value;
    setFormData(prev => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        options: newOptions
      }
    }));
  };

  // Handle adding a new reason
  const addReason = () => {
    setFormData(prev => ({
      ...prev,
      reasons: [...prev.reasons, { title: '', description: '' }]
    }));
  };

  // Handle adding a new future plan
  const addFuturePlan = () => {
    setFormData(prev => ({
      ...prev,
      futurePlans: [...prev.futurePlans, '']
    }));
  };

  // Handle adding a new map location
  const addMapLocation = () => {
    setFormData(prev => ({
      ...prev,
      mapLocations: [...prev.mapLocations, { name: '', address: '' }]
    }));
  };

  // Handle reminder reel upload
  const handleReminderReelUpload = (e) => {
    const files = Array.from(e.target.files);
    const newReminderReel = [...formData.reminderReel];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newReminderReel.push({
          file: file,
          preview: reader.result,
          caption: ''
        });
        setFormData(prev => ({
          ...prev,
          reminderReel: newReminderReel
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">Create Your Romantic Surprise</h1>
        <p className="text-gray-600">Fill in the details below to create a personalized surprise for your special someone</p>
      </div>

      {/* Section 1: Basic Information */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              name="yourName"
              value={formData.yourName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Your name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Their Name</label>
            <input
              type="text"
              name="crushName"
              value={formData.crushName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="The name of your special someone"
              required
            />
          </div>
        </div>
      </div>

      {/* Section 2: Main Photo */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Main Photo</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer">
                <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors">
                  Choose File
                </span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleMainPhotoUpload}
                />
              </label>
              <span className="ml-3 text-sm text-gray-600">
                {formData.mainPhoto ? formData.mainPhoto.name : 'No file chosen'}
              </span>
            </div>
            {formData.mainPhotoPreview && (
              <div className="mt-3">
                <img 
                  src={formData.mainPhotoPreview} 
                  alt="Preview" 
                  className="h-32 w-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
            <input
              type="text"
              name="mainPhotoCaption"
              value={formData.mainPhotoCaption}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="A special moment together"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Gallery Photos */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Gallery Photos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.galleryPhotos.map((photo, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-medium text-gray-700">Photo {index + 1}</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
                <div className="flex items-center">
                  <label className="cursor-pointer">
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                      Choose File
                    </span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => handleGalleryPhotoUpload(e, index)}
                    />
                  </label>
                  <span className="ml-3 text-sm text-gray-600">
                    {photo.file ? photo.file.name : 'No file chosen'}
                  </span>
                </div>
                {photo.preview && (
                  <div className="mt-2">
                    <img 
                      src={photo.preview} 
                      alt={`Preview ${index + 1}`} 
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  </div>
                )}
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
          ))}
        </div>
      </div>

      {/* Section 4: Handwritten Message */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Handwritten Message</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Personal Note</label>
          <textarea
            name="handwrittenMessage"
            value={formData.handwrittenMessage}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-handwriting text-xl leading-relaxed"
            placeholder="Write a heartfelt message in your own words..."
          />
        </div>
      </div>

      {/* Section 5: Quiz */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Love Quiz</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <input
              type="text"
              value={formData.quiz.question}
              onChange={(e) => handleNestedChange(e, 'quiz', 'question')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your quiz question"
            />
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {formData.quiz.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-gray-500 w-6">{String.fromCharCode(65 + index)}.</span>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleQuizOptionChange(e, index)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addQuizOption}
              className="mt-2 text-sm text-pink-600 hover:text-pink-700 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add another option
            </button>
          </div>
        </div>
      </div>

      {/* Section 6: Reasons You're Amazing */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Reasons You're Amazing</h2>
        
        <div className="space-y-6">
          {formData.reasons.map((reason, index) => (
            <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-lg">
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
          <button
            type="button"
            onClick={addReason}
            className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add another reason
          </button>
        </div>
      </div>

      {/* Section 7: Spotify Playlist */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Spotify Playlist</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Spotify Playlist URL</label>
          <input
            type="url"
            name="spotifyPlaylist"
            value={formData.spotifyPlaylist}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="https://open.spotify.com/playlist/..."
          />
          <p className="mt-1 text-sm text-gray-500">Share a playlist that reminds you of them</p>
        </div>
      </div>

      {/* Section 8: Map Locations */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Special Places</h2>
        
        <div className="space-y-6">
          {formData.mapLocations.map((location, index) => (
            <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                <input
                  type="text"
                  value={location.name}
                  onChange={(e) => handleArrayChange(e, index, 'mapLocations', 'name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="e.g., Our First Date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={location.address}
                  onChange={(e) => handleArrayChange(e, index, 'mapLocations', 'address')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="123 Memory Lane, City, Country"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addMapLocation}
            className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add another location
          </button>
        </div>
      </div>

      {/* Section 9: Future Plans */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Future Plans</h2>
        
        <div className="space-y-4">
          {formData.futurePlans.map((plan, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-pink-500">•</span>
              <input
                type="text"
                value={plan}
                onChange={(e) => handleArrayChange(e, index, 'futurePlans', null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder={`Future plan ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addFuturePlan}
            className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center mt-2"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add another plan
          </button>
        </div>
      </div>

      {/* Section 10: Word Cloud */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Word Cloud</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Words That Describe Them</label>
          <textarea
            name="wordCloud"
            value={formData.wordCloud}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Enter words separated by commas"
          />
          <p className="mt-1 text-sm text-gray-500">Separate words with commas (e.g., Amazing, Beautiful, Caring)</p>
        </div>
      </div>

      {/* Section 11: Reminder Reel */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Reminder Reel</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Videos or Photos</label>
          <div className="mt-1 flex items-center">
            <label className="cursor-pointer">
              <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors">
                Choose Files
              </span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*,video/*" 
                multiple
                onChange={handleReminderReelUpload}
              />
            </label>
            <span className="ml-3 text-sm text-gray-600">
              {formData.reminderReel.length} file{formData.reminderReel.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          {formData.reminderReel.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.reminderReel.map((item, index) => (
                <div key={index} className="relative group">
                  {item.preview.startsWith('data:video') ? (
                    <video 
                      src={item.preview} 
                      className="h-32 w-full object-cover rounded-lg"
                      controls
                    />
                  ) : (
                    <img 
                      src={item.preview} 
                      alt={`Preview ${index + 1}`} 
                      className="h-32 w-full object-cover rounded-lg"
                    />
                  )}
                  <input
                    type="text"
                    value={item.caption}
                    onChange={(e) => {
                      const newReel = [...formData.reminderReel];
                      newReel[index].caption = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        reminderReel: newReel
                      }));
                    }}
                    className="w-full mt-1 px-2 py-1 text-xs border border-gray-300 rounded"
                    placeholder="Add a caption"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section 12: Time Capsule */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Time Capsule</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unlock Date</label>
            <input
              type="date"
              value={formData.timeCapsule.unlockDate}
              onChange={(e) => handleNestedChange(e, 'timeCapsule', 'unlockDate')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              min={new Date().toISOString().split('T')[0]}
            />
            <p className="mt-1 text-sm text-gray-500">Choose a future date to reveal this message</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Secret Message</label>
            <textarea
              value={formData.timeCapsule.message}
              onChange={(e) => handleNestedChange(e, 'timeCapsule', 'message')}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Write a message to be revealed on the unlock date..."
            />
          </div>
        </div>
      </div>

      {/* Section 13: Outro Secret */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Final Touch</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Outro Secret Message</label>
          <input
            type="text"
            name="outroSecret"
            value={formData.outroSecret}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="A final secret message to end with..."
          />
          <p className="mt-1 text-sm text-gray-500">This will appear at the very end of your surprise</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <button
          type="submit"
          className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg font-semibold rounded-full hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 shadow-lg"
        >
          Create My Surprise
        </button>
      </div>
    </form>
  );
};

export default ConfigForm;
