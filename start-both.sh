#!/bin/bash

# Start the email server
echo "Starting email server..."
cd server && npm install && npm start &
SERVER_PID=$!

# Wait a bit for the server to initialize
sleep 2

# Start the frontend
echo "Starting frontend..."
cd .. && npm run dev &
FRONTEND_PID=$!

# Handle termination
function cleanup() {
    echo "Shutting down servers..."
    kill $SERVER_PID $FRONTEND_PID
    exit
}

# Register the cleanup function for these signals
trap cleanup SIGINT SIGTERM

# Keep the script running
wait 