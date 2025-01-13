# Golf Club Fitting Dashboard

## Overview

The Golf Club Fitting Dashboard is designed to streamline the process of scheduling, managing, and analyzing golf club fitting services. It provides a user-friendly interface for customers and administrators to interact seamlessly.

## Features

- Submit fitting or swing analysis requests.
- Schedule and manage fitting appointments.
- View fitting history and analysis results.
- User management for customers and admins.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/francisamidu/Golf-Club-Fitting.git
   ```
2. Navigate to the project directory:
   ```bash
   cd golf-club-fitting
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

## Usage

1. Configure development environment:
   `MONGO_URI=<your_mongo_connection_string>   JWT_SECRET=<your_jwt_secret> `

1. Start the backend server:
   ```bash
   cd backend && npm run start
   ```
1. Start the frontend development server:
   ```bash
   cd frontend && npm run start
   ```
1. Access the application in your browser at `http://localhost:5173`.

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Folder Structure

- `frontend/`: Contains the React-based user interface.
- `backend/`: Contains the Express.js API and database integration.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
