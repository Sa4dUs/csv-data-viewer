# CSV Data Viewer

This is a solution to a technical challenge that involves building a web application to load preformatted CSV data and display it as cards on a webpage with filtering capabilities.

## Problem Description

The challenge is to develop both the frontend and backend components of a web application. The application should allow users to upload a CSV file containing preformatted data and display that data as cards on a webpage. The frontend should be a Single Page Application (SPA) with features such as a button to upload the CSV file, a search bar for filtering the data, and displaying the data as cards. The backend should be implemented as a RESTful API using Node.js, with endpoints for uploading the CSV file and retrieving/searching through the data. The search functionality should be case-insensitive and support partial matching across all columns of the CSV.

## Solution Overview

### Frontend Features:
- Single Page Application (SPA) built using Vite and React.js.
- User interface elements including a button for uploading CSV files, a search bar for filtering data, and a layout to display data as cards.
- Integration with backend API endpoints for uploading CSV files and retrieving data.
- Utilizes Tailwind CSS for styling.

### Backend Features:
- RESTful API built using Node.js and Express framework.
- Endpoints for:
  - Uploading CSV files (`POST /api/files`).
  - Retrieving/searching data (`GET /api/users`).
- Parsing and processing CSV files.
- Implementing search functionality that is case-insensitive and supports partial matching across all columns.

## Usage

1. Clone this repository.
2. Navigate to the `frontend` directory and install dependencies.
    ```bash
    cd frontend
    npm install
    ```
3. Start the frontend server.
    ```bash
    npm start
    ```
4. Navigate to the `backend` directory and install dependencies.
    ```bash
    cd ../backend
    npm install
    ```
5. Start the backend server.
    ```bash
    npm start
    ```
6. Access the application in your web browser at `http://localhost:3000`.

## Technologies Used

- Frontend:
  - [Vite](https://vitejs.dev/)
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
- Backend:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [CSV Parser](https://csv.js.org/parse/) (for parsing CSV files)

## Authors

- [Sa4dUs](https://github.com/sa4dus)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.