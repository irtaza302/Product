# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install dependencies for Linux platform
RUN npm ci --platform=linux --arch=x64 --target=x64

# Copy configuration files
COPY postcss.config.js tailwind.config.js ./

# Copy all source files
COPY . .

# Build TypeScript and Vite
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copy package files and install ALL dependencies
COPY package*.json ./
RUN npm ci --platform=linux --arch=x64 --target=x64

# Copy configuration files
COPY vite.config.ts tsconfig*.json ./
COPY postcss.config.js tailwind.config.js ./
COPY index.html ./

# Copy source code and built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Expose ports for both frontend and backend
EXPOSE 5000 5173

# Start both services
CMD ["npm", "run", "dev:all"]