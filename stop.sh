#!/bin/bash

# Stop the Spring Boot application
if [ -f spring_app.pid ]; then
  SPRING_PID=$(cat spring_app.pid)
  echo "Stopping the Spring Boot application with PID $SPRING_PID..."
  kill $SPRING_PID
  rm spring_app.pid
  echo "Spring Boot application stopped."
else
  echo "Spring PID file not found. The Spring Boot application might not be running."
fi

# Stop the Angular application
if [ -f frontend/angular_app.pid ]; then
  ANGULAR_PID=$(cat frontend/angular_app.pid)
  echo "Stopping the Angular application with PID $ANGULAR_PID..."
  kill $ANGULAR_PID
  rm frontend/angular_app.pid
  echo "Angular application stopped."
else
  echo "Angular PID file not found. The Angular application might not be running."
fi


