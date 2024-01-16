#!/bin/bash

# Paths to client and server folders
clientPath="./client"
serverPath="./server"

# Install dependencies and run services
cd "$clientPath" || exit
npm install
npm run dev &

cd ..

cd "$serverPath" || exit
npm install
npm start
