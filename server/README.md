# Quickwink Email Server

This is a simple Node.js server that provides direct email forwarding for the Quickwink website contact form.

## Setup Instructions

1. Install dependencies:
   ```
   cd server
   npm install
   ```

2. Configure your Gmail account:
   - You'll need to generate an App Password from your Google account
   - Go to Google Account > Security > App passwords
   - Select "Mail" as the app and "Other" as the device
   - Enter a name for the app password (e.g., "Quickwink Email Server")
   - Click "Generate" and Google will provide you with a 16-character app password

3. Configure the server:
   - Edit the `config.js` file
   - Replace `your_app_password_here` with the app password generated from Google

4. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

5. Test the server:
   - Navigate to `http://localhost:3000/api/test` in your browser
   - You should see a JSON response: `{"message":"Email server is running!"}`

## API Endpoints

### POST /api/send-email
Sends an email using the configured Gmail account.

Request body:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "company": "Example Company",
  "message": "Hello, I'm interested in your services."
}
```

Response:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Important Notes

1. This server is designed as a backup for the EmailJS service
2. The frontend will first try to send emails via EmailJS before falling back to this service
3. For production, consider:
   - Using a more robust email service like SendGrid or Mailgun
   - Setting up proper environment variables
   - Adding rate limiting and other security features
   - Deploying to a reliable hosting service 