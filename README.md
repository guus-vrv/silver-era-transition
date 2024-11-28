# Silver Era Transition

Silver Era Transition is a web application designed to streamline the Mergers and Acquisitions (M&A) process for brokers. By focusing on cultural fit, the platform increases the likelihood of successful matches between buyers and sellers, leading to more successful deals.

---

## Features

- **Enhanced Matchmaking**: Prioritizes culture fit to improve the quality of deals.
- **Broker-Friendly Workflow**: Simplifies the M&A process with intuitive features.
- **Scalable Architecture**: Designed for easy integration and future enhancements.

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/guus-vrv/silver-era-transition
   cd silver-era-transition

   ```

2. Install dependencies
   For the back-end:
   ```bash
   cd server
   npm install
   ```

For the front-end:

````bash
cd ../client
npm install

---

## Running the application

1. Start the Backend
   Navigate to the server folder and run the backend server:

```bash
    Copy code
    cd server
    npx nodemon server.js
````

2. Start the Frontend

Navigate to the client folder and start the frontend:

```bash
    Copy code
    cd client
    npm start
```

The application will now be accessible in your web browser. The default URL is:

http://localhost:3000

---

## Project structure

SilverEraTransition/
├── client/ # Frontend code (React)
│ ├── public/  
│ ├── src/ # Application source code
├── components/  
 ├── Auth/ # Login / register / authentication (session timeout) code
├── Brokers/ # components that brokers will see or have access to - select chat profiles/groupchat are for the 'add room' page
├── BuyersSellers/ # components for buyers and sellers will see or have access to
├── styles/ # .css files for components, only the landing page uses Tailwind css directly in the React component
│ └── package.json # Frontend dependencies
├── server/ # Backend code (Node.js)
│ ├── routes/ # API routes
│ ├── models/ # Database models
│ └── package.json # Backend dependencies
└── README.md # Project documentation

---

## Dependencies

The required packages and dependencies are listed in:

1. client/package.json (Frontend)
2. server/package.json (Backend)

To install them, run npm install in their respective directories.

---

## Configuration

Sensitive information (e.g., API keys, database credentials) should be stored in a .env file. Create .env files in the server and/or client directories if needed. Examples:

env

# Example .env file for the backend (server/.env)

MONGO_URI=mongodb+srv://username:password@setdb.fonny.mongodb.net/SETDB?retryWrites=true&w=majority&appName=SETDB
NODE_ENV=development

# Example .env file for the frontend (client/.env)

REACT_APP_API_URL=https://silver-era-transition.onrender.com

---

## Troubleshooting

If you encounter any issues:

- Ensure all dependencies are installed (npm install).
- Verify Node.js and npm versions.
- Check logs in the terminal for error messages.

---

## Contact

For questions or support, contact:

Name: Guus van Rees
Email: guus@guusvanrees.com
