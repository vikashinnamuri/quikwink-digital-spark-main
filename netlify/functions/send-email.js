const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');

// Load environment variables (Netlify will provide these)
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT || 'vikashinnamuri@gmail.com,lohapriyamanthiram@gmail.com';
const SENDER_NAME = process.env.SENDER_NAME || 'Quickwink Contact Form';
const SUBJECT_PREFIX = process.env.SUBJECT_PREFIX || 'Quickwink Contact: ';
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'gmail';
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587');
const EMAIL_SECURE = process.env.EMAIL_SECURE === 'true'; // For port 587, typically false and STARTTLS is used

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE, // Use STARTTLS for port 587 if secure is false
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  },
  tls: {
    // Required for Gmail on port 587 with secure: false
    ciphers: 'SSLv3',
    rejectUnauthorized: false
  }
});

// Validation middleware for email endpoint
// Note: This is an array of checks similar to express-validator's use
const validateEmail = [
  check('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
    .escape(),

  check('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  check('company')
    .trim()
    .isLength({ max: 100 }).withMessage('Company name cannot exceed 100 characters')
    .escape(),

  check('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters')
    .escape()
];

// Netlify Function handler
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST' }
    };
  }

  // Parse the request body
  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON body' })
    };
  }

  // Manually run validations
  // Create a mock request object for express-validator
  const req = { body: body };
  await Promise.all(validateEmail.map(validation => validation.run(req)));
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    };
  }

  try {
    const { name, email, company, message } = body;

    // Email template
    const mailOptions = {
      from: `"${SENDER_NAME}" <${EMAIL_USER}>`,
      to: EMAIL_RECIPIENT,
      replyTo: email,
      subject: `${SUBJECT_PREFIX}${name} from ${company || 'Not Specified'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #00BFFF; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Message from Quickwink Contact Form</h2>
          
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
            <p>This email was sent from the contact form on the Quickwink website.</p>
          </div>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Email sent successfully to: ${EMAIL_RECIPIENT}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Message sent successfully!' })
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Failed to send email', error: error.message })
    };
  }
}; 