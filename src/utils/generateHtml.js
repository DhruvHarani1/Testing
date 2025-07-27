/**
 * Generates a complete HTML page as a string from form data
 * @param {Object} formData - The form data object containing all user inputs
 * @returns {string} - Complete HTML page as a string
 */
export const generateHtmlPage = (formData) => {
  const {
    crushName = '',
    yourName = '',
    mainPhotoUrl = 'https://placehold.co/1200x800/e0e0e0/333333?text=Main+Photo',
    mainPhotoCaption = 'A special moment together',
    galleryPhotos = [],
    handwrittenMessage = 'A special message just for you...',
    reasons = [],
    futurePlans = [],
    wordCloud = 'Kind, Loving, Amazing',
    timeCapsule = { unlockDate: '', message: '' },
    outroSecret = 'P.S. You mean the world to me.'
  } = formData;

  // Helper function to create gallery HTML
  const createGalleryHtml = () => {
    if (!galleryPhotos.length) return '';
    return `
      <div class="gallery-section">
        <h2>Our Special Moments</h2>
        <div class="gallery-grid">
          ${galleryPhotos.map(photo => `
            <div class="gallery-item">
              <img src="${photo.src}" alt="${photo.caption || 'Special moment'}" />
              ${photo.caption ? `<p class="caption">${photo.caption}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  // Helper function to create reasons HTML
  const createReasonsHtml = () => {
    if (!reasons.length) return '';
    return `
      <div class="reasons-section">
        <h2>Reasons You're Amazing</h2>
        <div class="reasons-grid">
          ${reasons.map(reason => `
            <div class="reason-card">
              <h3>${reason.title}</h3>
              <p>${reason.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  // Main HTML template
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>A Special Surprise for ${crushName}</title>
      <link href="https://cdn.tailwindcss.com" rel="stylesheet">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@400;700&family=Kalam&display=swap');
        :root { 
          --ivory: #fdfdfb; 
          --charcoal: #333333; 
          --stone-200: #e7e5e4; 
          --stone-500: #78716c; 
          --stone-600: #57534e; 
          --stone-700: #44403c; 
          --stone-800: #292524; 
          --gradient-start: #fdfdfb; 
          --gradient-end: #fff0f5; 
        }
        body { 
          font-family: 'Inter', sans-serif; 
          color: var(--charcoal); 
          background-color: var(--ivory);
          line-height: 1.6;
        }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-serif-display { font-family: 'Playfair Display', serif; }
        .font-handwriting { font-family: 'Kalam', cursive; }
        .animated-gradient { 
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end)); 
          background-size: 200% 200%; 
          animation: gradient-animation 15s ease infinite; 
        }
        @keyframes gradient-animation { 
          0% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
          100% { background-position: 0% 50%; } 
        }
        
        /* Add more styles as needed */
        .hero-section {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .hero-content {
          max-width: 800px;
          z-index: 2;
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          padding: 2rem 0;
        }
        
        .gallery-item img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .gallery-item img:hover {
          transform: scale(1.03);
        }
        
        .caption {
          margin-top: 0.5rem;
          color: var(--stone-600);
          font-style: italic;
        }
        
        .reasons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        
        .reason-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .reason-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        /* Add responsive design */
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
          
          .reasons-grid {
            grid-template-columns: 1fr;
          }
        }
      </style>
    </head>
    <body class="animated-gradient">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="text-4xl md:text-6xl font-serif-display mb-6">For ${crushName}</h1>
          <p class="text-xl md:text-2xl mb-8">A special message from ${yourName || 'someone who cares'}</p>
          <div class="handwritten-message text-2xl font-handwriting my-12">
            "${handwrittenMessage}"
          </div>
        </div>
      </section>
      
      <!-- Main Photo -->
      <section class="py-12 px-4 max-w-5xl mx-auto">
        <div class="bg-white rounded-xl shadow-xl overflow-hidden">
          <img src="${mainPhotoUrl}" alt="Special moment with ${crushName}" class="w-full h-auto max-h-[80vh] object-cover" />
          ${mainPhotoCaption ? `
            <div class="p-6 text-center">
              <p class="text-lg text-stone-600">${mainPhotoCaption}</p>
            </div>
          ` : ''}
        </div>
      </section>
      
      <!-- Gallery Section -->
      ${galleryPhotos.length > 0 ? createGalleryHtml() : ''}
      
      <!-- Reasons Section -->
      ${reasons.length > 0 ? createReasonsHtml() : ''}
      
      <!-- Word Cloud Section -->
      ${wordCloud ? `
        <section class="py-12 px-4 max-w-4xl mx-auto">
          <h2 class="text-3xl font-serif-display text-center mb-8">Words That Describe You</h2>
          <div class="flex flex-wrap justify-center gap-4">
            ${wordCloud.split(',').map(word => word.trim()).map(word => `
              <span class="px-4 py-2 bg-white rounded-full shadow-md text-lg font-medium">
                ${word}
              </span>
            `).join('')}
          </div>
        </section>
      ` : ''}
      
      <!-- Future Plans -->
      ${futurePlans.length > 0 ? `
        <section class="py-16 px-4 max-w-3xl mx-auto">
          <h2 class="text-3xl font-serif-display text-center mb-8">Our Future Together</h2>
          <ul class="space-y-4">
            ${futurePlans.map(plan => `
              <li class="flex items-start">
                <span class="text-2xl mr-3">💫</span>
                <span class="text-lg">${plan}</span>
              </li>
            `).join('')}
          </ul>
        </section>
      ` : ''}
      
      <!-- Time Capsule -->
      ${timeCapsule && timeCapsule.message ? `
        <section class="py-16 px-4 max-w-3xl mx-auto text-center">
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-serif-display mb-4">A Message for the Future</h3>
            <p class="text-lg mb-4">${timeCapsule.message}</p>
            ${timeCapsule.unlockDate ? `
              <p class="text-sm text-stone-500">To be revealed on: ${new Date(timeCapsule.unlockDate).toLocaleDateString()}</p>
            ` : ''}
          </div>
        </section>
      ` : ''}
      
      <!-- Outro -->
      <footer class="py-12 px-4 text-center">
        <p class="text-lg mb-4">Made with love by ${yourName || 'someone special'}</p>
        <p class="text-sm text-stone-500">${new Date().getFullYear()}</p>
        ${outroSecret ? `
          <div class="mt-8 p-4 bg-white/50 rounded-lg inline-block">
            <p class="font-handwriting text-xl">${outroSecret}</p>
          </div>
        ` : ''}
      </footer>
      
      <script>
        // Add any interactive elements here
        document.addEventListener('DOMContentLoaded', () => {
          // Simple animation for elements with the 'fade-in' class
          const fadeElements = document.querySelectorAll('.fade-in');
          
          const fadeInOnScroll = () => {
            fadeElements.forEach(element => {
              const elementTop = element.getBoundingClientRect().top;
              const windowHeight = window.innerHeight;
              
              if (elementTop < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
              }
            });
          };
          
          // Initial check
          fadeInOnScroll();
          
          // Check on scroll
          window.addEventListener('scroll', fadeInOnScroll);
        });
      </script>
    </body>
    </html>
  `;
};

/**
 * Converts an image URL to a base64 string
 * @param {string} url - The image URL
 * @returns {Promise<string>} - Base64 encoded image
 */
export const imageToBase64 = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

/**
 * Processes all images in the form data to base64
 * @param {Object} formData - The form data
 * @returns {Promise<Object>} - Form data with images as base64
 */
export const processImagesToBase64 = async (formData) => {
  const processedData = { ...formData };
  
  // Process main photo
  if (formData.mainPhotoUrl && !formData.mainPhotoUrl.startsWith('data:')) {
    try {
      const base64 = await imageToBase64(formData.mainPhotoUrl);
      if (base64) processedData.mainPhotoUrl = base64;
    } catch (error) {
      console.error('Error processing main photo:', error);
    }
  }
  
  // Process gallery photos
  if (formData.galleryPhotos && formData.galleryPhotos.length > 0) {
    for (let i = 0; i < formData.galleryPhotos.length; i++) {
      const photo = formData.galleryPhotos[i];
      if (photo.src && !photo.src.startsWith('data:')) {
        try {
          const base64 = await imageToBase64(photo.src);
          if (base64) processedData.galleryPhotos[i].src = base64;
        } catch (error) {
          console.error(`Error processing gallery photo ${i + 1}:`, error);
        }
      }
    }
  }
  
  return processedData;
};
