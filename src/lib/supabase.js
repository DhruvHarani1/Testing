import { createClient } from '@supabase/supabase-js';

// Supabase configuration with environment variable fallbacks
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://qtlxubxgvboddioewnth.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bHh1YnhndmJvZGRpb2V3bnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NDY2NzYsImV4cCI6MjA2OTIyMjY3Nn0.5pGxeOkIOjoGqZRVv5Y6WU5P5FZ4nm-UqTxGcsoCSME';

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key are required!');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We'll handle session persistence manually if needed
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Test the connection on startup
const testConnection = async () => {
  try {
    const { error } = await supabase.from('surprises').select('*').limit(1);
    if (error) {
      console.error('Supabase connection error:', error.message);
    } else {
      console.log('Successfully connected to Supabase');
    }
  } catch (error) {
    console.error('Error testing Supabase connection:', error.message);
  }
};

// Run the connection test
testConnection();

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
