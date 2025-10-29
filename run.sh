#!/bin/bash

echo "Starting full-stack project..."

docker-compose up --build -d

echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:8080"
echo "To stop, run ./stop.sh"
