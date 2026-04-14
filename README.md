# Openroot Classes

Openroot Classes is a modern online learning platform designed to deliver practical skills in areas such as artificial intelligence, finance, and productivity. The platform is built with a scalable full-stack architecture and focuses on real-world application rather than theoretical learning.

---

## Technology Stack

* React (Create React App)
* Firebase (Authentication and Hosting)
* Node.js (Backend APIs)
* Razorpay (Payment Integration)
* Google Cloud Platform (Infrastructure)

---

## Features

* User authentication using Firebase
* Secure payment integration with Razorpay
* Course-based structured learning system
* Responsive and performant user interface
* Cloud-based deployment and scalability
* Practical, industry-oriented content delivery

---

## Project Structure

```
openroot-classes/
│
├── public/              # Static assets
├── server/              # Backend services and APIs
├── src/
│   ├── assets/          # Media files and animations
│   ├── components/      # Reusable UI components
│   ├── styles/          # Styling and layout files
│   └── firebase.js      # Firebase configuration
│
├── package.json
├── .gitignore
└── .env.example
```

Note: The directories `node_modules`, `build`, and the `.env` file are excluded from version control.

---

## Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## Getting Started

Install dependencies:

```
npm install
```

Start the development server:

```
npm start
```

---

## Production Build

To generate a production build:

```
npm run build
```

---

## Deployment

The application is deployed using:

* Firebase Hosting for the frontend
* Node.js for backend services
* Google Cloud Platform for infrastructure support

---

## Security Considerations

* Sensitive configuration values are stored in environment variables
* The `.env` file is excluded from version control
* Only `.env.example` is shared in the repository

---

## Contribution

Contributions are welcome. Please fork the repository and submit a pull request with appropriate changes.

---

## Author

Somnath Banerjee (Openroot)
