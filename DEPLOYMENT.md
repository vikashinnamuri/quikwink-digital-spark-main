# Quikwink Website Deployment Guide

This guide provides instructions for deploying the Quikwink website to a production server.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A hosting service (e.g., DigitalOcean, Vercel, Netlify, AWS, etc.)
- Domain name (optional)

## Building the Frontend

1. Navigate to the project root directory and run:

```bash
npm install
npm run build
```

This will create a `/dist` directory with the optimized production build.

## Setting Up Environment Variables

1. Create a `.env` file in the `server` directory using the template below:

```
# Server configuration
PORT=3000
NODE_ENV=production

# Client URL for CORS
CLIENT_URL=https://quikwink.com

# Email configuration
EMAIL_USER=lohapriyamanthiram@gmail.com
EMAIL_PASS=your_app_password_here
EMAIL_RECIPIENT=vikashinnamuri@gmail.com, lohapriyamanthiram@gmail.com
SENDER_NAME=Quikwink Contact Form
SUBJECT_PREFIX=Quikwink Contact: 

# SMTP configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

2. Replace `your_app_password_here` with the actual Gmail app password.
3. Update `CLIENT_URL` with your actual production domain.

## Deployment Options

### Option 1: Combined Frontend & Backend Deployment

1. Install the required packages in the server directory:

```bash
cd server
npm install
```

2. Start the server:

```bash
NODE_ENV=production node server.js
```

The server will serve both the API endpoints and the static frontend files from the `dist` directory.

### Option 2: Separate Frontend & Backend Deployment

#### Frontend Deployment

Deploy the `/dist` directory to a static hosting service like Netlify, Vercel, or GitHub Pages.

#### Backend Deployment

1. Deploy the `server` directory to a Node.js hosting service.
2. Make sure to set all the required environment variables.
3. Update the frontend API URL to point to your deployed backend server.

## Using a Process Manager (Recommended)

For production, it's recommended to use a process manager like PM2:

```bash
npm install -g pm2
cd server
pm2 start server.js --name "quikwink-server"
```

## Setting Up a Domain Name

1. Purchase a domain name from a domain registrar.
2. Configure DNS settings to point to your hosting service.
3. Update the `CLIENT_URL` environment variable with your domain.

## SSL/HTTPS Setup

For a production website, always use HTTPS:

1. Obtain an SSL certificate (many hosting providers offer free certificates via Let's Encrypt).
2. Configure your server to use the SSL certificate.
3. Ensure all requests are redirected from HTTP to HTTPS.

## Troubleshooting

If you encounter issues with the email functionality:

1. Check that the Gmail account has 2-factor authentication enabled and a valid app password.
2. Verify that the email configuration in the environment variables is correct.
3. Check server logs for any error messages.
4. Make sure CORS settings include your production domain.

## Ongoing Maintenance

1. Regularly update dependencies to fix security vulnerabilities.
2. Monitor server logs for errors.
3. Set up automated backups for your database (if applicable).
4. Implement monitoring to ensure the site remains online. 