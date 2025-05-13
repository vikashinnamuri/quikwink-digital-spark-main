const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const config = require('./config');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

console.log('Starting server...');
console.log('Current directory:', __dirname);

const app = express();
const PORT = config.port;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', config.clientURL],
  methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Simple rate limiting middleware
const requestCounts = {};
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 20; // 20 emails per hour max

const rateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  
  // Initialize or clean up old entries
  if (!requestCounts[ip] || (now - requestCounts[ip].timestamp > RATE_LIMIT_WINDOW)) {
    requestCounts[ip] = {
      count: 0,
      timestamp: now
    };
  }
  
  // Increment count
  requestCounts[ip].count++;
  
  // Check if over limit
  if (requestCounts[ip].count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ 
      success: false, 
      message: 'Too many requests, please try again later.'
    });
  }
  
  next();
};

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Email logging middleware
const logEmail = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Only log successful emails
    const responseData = JSON.parse(data);
    if (responseData.success) {
      const { name, email, company, message } = req.body;
      const timestamp = new Date().toISOString();
      const logEntry = `${timestamp} - Email sent - From: ${name} <${email}>, Company: ${company || 'N/A'}\n`;
      
      fs.appendFile(path.join(logsDir, 'email-log.txt'), logEntry, (err) => {
        if (err) console.error('Failed to write to log:', err);
      });
    }
    
    originalSend.call(this, data);
  };
  
  next();
};

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: config.email.smtp.service,
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: config.email.smtp.secure,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

// Verify transporter connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email transporter configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Email API endpoint with rate limiting and logging
app.post('/api/send-email', rateLimiter, logEmail, async (req, res) => {
  try {
    const { name, email, company, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required fields' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }
    
    // Email template
    const mailOptions = {
      from: `"${config.email.sender_name}" <${config.email.user}>`,
      to: config.email.recipient,
      replyTo: email,
      subject: `${config.email.subject_prefix}${name} from ${company || 'Not Specified'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #00BFFF; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Message from Quikwink Contact Form</h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not specified'}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <h3 style="margin-top: 0; color: #555;">Message:</h3>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; font-size: 12px; color: #777; text-align: center;">
            <p>This email was sent from the contact form on the Quikwink website.</p>
          </div>
        </div>
      `
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Email server is running!' });
});

// Status route
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'online',
    configured_email: config.email.user,
    rate_limit: `${MAX_REQUESTS_PER_WINDOW} emails per ${RATE_LIMIT_WINDOW/1000/60} minutes`,
    uptime: `${Math.floor(process.uptime())} seconds`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Email server configured for: ${config.email.user}`);
  console.log(`App password being used: ${config.email.pass ? config.email.pass.substring(0, 3) + '***' : 'none'}`);
})
.on('error', (err) => {
  console.error('Failed to start server:', err);
}); 