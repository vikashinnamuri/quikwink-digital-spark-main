// Email Configuration
/**
 * Email Server Configuration
 * 
 * To set up Gmail with an app password:
 * 1. Go to your Google Account > Security > 2-Step Verification (enable if not already)
 * 2. Then go to App passwords
 * 3. Select "Mail" as the app and "Other" as the device
 * 4. Enter a name for the app password (e.g., "Quikwink Email Server")
 * 5. Click "Generate" and Google will provide you with a 16-character app password
 * 6. Copy that password and use it in your environment variables or .env file
 */

module.exports = {
  port: process.env.PORT || 3000,
  
  // Client URL for CORS (update the default for your production domain)
  clientURL: process.env.CLIENT_URL || 'http://localhost:8080',
  
  // Email settings
  email: {
    // Gmail account details (use environment variables in production)
    user: process.env.EMAIL_USER || 'vikashinnamuri@gmail.com',
    pass: process.env.EMAIL_PASS || 'taxj ixgk udxn auaq',
    recipient: process.env.EMAIL_RECIPIENT || 'vikashinnamuri@gmail.com,lohapriyamanthiram@gmail.com',
    
    // Email options
    sender_name: process.env.SENDER_NAME || 'Quikwink Contact Form',
    subject_prefix: process.env.SUBJECT_PREFIX || 'Quikwink Contact: ',
    
    // SMTP configuration (optimized for Gmail)
    smtp: {
      service: process.env.EMAIL_SERVICE || 'gmail',
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true' ? false : false // Set to false for port 587
    }
  }
};

