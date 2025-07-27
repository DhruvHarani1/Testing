import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadSurprisePage, saveSurpriseMetadata } from '../lib/supabase';
import { generateHtmlPage, processImagesToBase64 } from '../utils/generateHtml';

const PreviewAndShare = ({ formData, onBack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  const [error, setError] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();

  // Process form data and upload to Supabase
  useEffect(() => {
    const generateAndUploadPage = async () => {
      try {
        setIsLoading(true);
        
        // Process any images to base64 if needed
        const processedData = await processImagesToBase64(formData);
        
        // Generate the HTML content
        const htmlContent = generateHtmlPage(processedData);
        
        // Generate a unique filename
        const fileName = `surprise-${Date.now()}.html`;
        
        // Upload the HTML file to Supabase
        const uploadResult = await uploadSurprisePage(htmlContent, fileName);
        
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Failed to upload surprise page');
        }
        
        // Save metadata to the database
        const metadata = {
          crush_name: formData.crushName,
          your_name: formData.yourName || 'Anonymous',
          page_url: uploadResult.publicUrl,
          created_at: new Date().toISOString(),
          theme: 'default' // You can add theme selection in the form later
        };
        
        const saveResult = await saveSurpriseMetadata(metadata);
        
        if (!saveResult.success) {
          console.warn('Failed to save metadata:', saveResult.error);
          // Continue even if metadata save fails
        }
        
        // Set the preview URL and shareable link
        setPreviewUrl(uploadResult.publicUrl);
        setShareableLink(uploadResult.publicUrl);
        
      } catch (err) {
        console.error('Error generating surprise page:', err);
        setError(err.message || 'An error occurred while creating your surprise page');
      } finally {
        setIsLoading(false);
      }
    };
    
    generateAndUploadPage();
  }, [formData]);

  // Toggle between mobile and desktop preview
  const toggleView = () => {
    setIsMobileView(!isMobileView);
  };

  // Copy the shareable link to clipboard
  const copyToClipboard = () => {
    if (!shareableLink) return;
    
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        // Show a success message (you could use a toast notification here)
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy link:', err);
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = shareableLink;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Fallback copy failed:', err);
          alert('Failed to copy link. Please copy it manually.');
        }
        document.body.removeChild(textArea);
      });
  };

  // Share via Web Share API if available
  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A Special Surprise for ${formData.crushName}`,
          text: `${formData.yourName || 'Someone'} has created a special surprise for you!`,
          url: shareableLink,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      copyToClipboard();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-16 w-16 bg-pink-200 rounded-full mb-4"></div>
            <div className="h-6 bg-pink-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-pink-100 rounded w-1/2"></div>
          </div>
          <p className="mt-6 text-pink-600">Creating your special surprise...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">Your Surprise is Ready! 🎉</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share this special link with {formData.crushName || 'your special someone'}. 
            When they open it, they'll see the beautiful page you've created!
          </p>
        </div>

        {/* Preview Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Preview</h2>
            <button
              onClick={toggleView}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {isMobileView ? 'Desktop View' : 'Mobile View'}
            </button>
          </div>
          
          <div className={`bg-white rounded-xl shadow-xl overflow-hidden ${isMobileView ? 'max-w-sm mx-auto' : 'w-full'}`}>
            <div className={`bg-gray-100 border-b border-gray-200 p-3 flex items-center justify-between ${isMobileView ? 'h-12' : 'h-8'}`}>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs text-gray-500">
                {isMobileView ? 'mobile preview' : 'desktop preview'}
              </div>
              <div className="w-12"></div> {/* Spacer for flex alignment */}
            </div>
            
            <div className={`bg-white ${isMobileView ? 'h-[600px]' : 'h-[800px]'} overflow-auto`}>
              {previewUrl ? (
                <iframe 
                  src={previewUrl} 
                  title="Preview" 
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Loading preview...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Share Your Surprise</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Shareable Link</label>
            <div className="flex">
              <input
                type="text"
                readOnly
                value={shareableLink}
                className="flex-1 px-4 py-2 border border-r-0 border-gray-300 rounded-l-lg focus:ring-pink-500 focus:border-pink-500"
                onClick={(e) => e.target.select()}
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-pink-500 text-white rounded-r-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={shareLink}
              className="flex items-center justify-center px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Now
            </button>
            
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in New Tab
            </a>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Sharing Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Send the link via text, email, or any messaging app</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>For extra surprise, try hiding the URL with a URL shortener</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>Add a sweet message when you share the link</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={onBack}
              className="text-pink-600 hover:text-pink-700 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Editor
            </button>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>This link will be active for 30 days. For extended access, please sign up for an account.</p>
          <p className="mt-2">Created with ❤️ by Your Company Name</p>
        </div>
      </div>
    </div>
  );
};

export default PreviewAndShare;
