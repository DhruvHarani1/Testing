import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to upload HTML file to Supabase Storage
export const uploadSurprisePage = async (htmlContent, fileName) => {
  try {
    // Create a Blob from the HTML string
    const file = new Blob([htmlContent], { type: 'text/html' });
    
    // Generate a unique filename if not provided
    const finalFileName = fileName || `surprise-${Date.now()}.html`;
    
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('surprises')
      .upload(finalFileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: 'text/html'
      });

    if (error) throw error;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('surprises')
      .getPublicUrl(finalFileName);

    return {
      success: true,
      fileName: finalFileName,
      publicUrl,
      data
    };
  } catch (error) {
    console.error('Error uploading surprise page:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Function to save surprise metadata to the database
export const saveSurpriseMetadata = async (metadata) => {
  try {
    const { data, error } = await supabase
      .from('surprises')
      .insert([metadata])
      .select();

    if (error) throw error;
    
    return {
      success: true,
      data: data[0]
    };
  } catch (error) {
    console.error('Error saving surprise metadata:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
