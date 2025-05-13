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
 * 6. Copy that password and replace 'your_app_password_here' below
 */

module.exports = {
  port: process.env.PORT || 3000,
  
  // Client URL for CORS (add your production URL when deploying)
  clientURL: process.env.CLIENT_URL || 'https://quikwink.com',
  
  // Email settings
  email: {
    // Gmail account details
    user: process.env.EMAIL_USER || 'vikashinnamuri@gmail.com',
    pass: process.env.EMAIL_PASS || 'xoga rjjh reyt drqu',
    recipient: process.env.EMAIL_RECIPIENT || 'vikashinnamuri@gmail.com',
    
    // Email options
    sender_name: 'Quikwink Contact Form',
    subject_prefix: 'Quikwink Contact: ',
    
    // SMTP configuration (only change if not using Gmail)
    smtp: {
      service: 'gmail',      // Use 'gmail' for Gmail
      host: 'smtp.gmail.com', // Only used if service is not specified
      port: 465,              // 465 for SSL, 587 for TLS
      secure: true            // true for 465, false for other ports
    }
  }
}; 