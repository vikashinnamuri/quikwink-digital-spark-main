# Quickwink Digital Solutions

## About This Project

Quickwink is a modern tech company that specializes in AI solutions and custom software development. This repository contains the code for the Quickwink marketing website.

## Project Features

- Modern React/TypeScript frontend
- Responsive design with TailwindCSS
- Interactive UI components built with shadcn-ui
- Custom email server for contact form

## Getting Started

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps to run the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd quickwink-digital-spark

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server with auto-reloading
npm run dev
```

## Starting the Email Server

To enable the contact form functionality, you need to run the email server:

```sh
# Navigate to the server directory
cd server

# Install server dependencies (first time only)
npm install

# Start the email server
node server.js
```

## Technology Stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Node.js/Express (email server)

## Project Structure

- `/src` - React application source code
- `/public` - Static assets
- `/server` - Email server code

## Deployment

The site can be deployed to any static web hosting service. The email server should be deployed to a Node.js hosting environment.

## Custom Domain Setup

To connect a custom domain, configure your DNS provider to point to your hosting service's IP address or use their domain configuration tools.
