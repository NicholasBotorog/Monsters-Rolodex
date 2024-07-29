# Stage 1: Build the image 
FROM node:alpine AS build 

# Set the working directory 
WORKDIR /app 

# Install dependencies 
COPY package.json package-lock.json ./
RUN npm install 

# Copy the rest of the application and the .env file 
COPY . . 
COPY .env .env 

# Build the application
RUN npm run build 

# Stage 2: Run the application 

FROM node:alpine 

# Set working directory 
WORKDIR /app 

# Copy the build files and other requred files from the build stage 
COPY --from=build /app/build /app/build 
COPY package.json package-lock.json server.js ./
COPY .env .env

# Install production dependecies only 
RUN npm install --only=production 

# Expose port 
EXPOSE 8080

# Start the server 
CMD ["npm", "start"]