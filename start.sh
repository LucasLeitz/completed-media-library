#!/bin/bash

# Start the Spring Boot application
echo "Starting the Spring Boot application..."
./mvnw spring-boot:run > spring.log 2>&1 &
SPRING_PID=$!
echo $SPRING_PID > spring_app.pid
echo "Spring Boot started with PID $SPRING_PID. Logs are available in spring.log."

# Start the Angular application in the frontend folder
echo "Starting the Angular application..."
cd frontend
ng serve --open > angular.log 2>&1 &
ANGULAR_PID=$!
echo $ANGULAR_PID > angular_app.pid
echo "Angular started with PID $ANGULAR_PID. Logs are available in angular.log."

# Return to the original directory
cd -

