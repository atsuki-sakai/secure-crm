FROM node:22-alpine

# Set the working directory
WORKDIR /src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Start the application
CMD ["npm", "run", "dev"]