# Campus Connect

Campus Connect is a platform designed to help students and professionals network, find blogs and internships, and create their own blog posts. It's a community hub for sharing knowledge, opportunities, and connecting with like-minded individuals.

## Features

- **Browse Blogs**: Discover a wide range of blogs across various topics.
- **Internships**: Find internship opportunities tailored for students and young professionals.
- **Create Blogs**: Share your insights, experiences, and knowledge by writing your own blogs.
- **Networking**: Connect with other users, follow their posts, and build your professional network.

## Tech Stack

- **Frontend**: Vite, React, TypeScript, TailwindCSS, Zod, Radix-UI
- **Backend**: Google Firebase (requires configuration)
- **Hosting**: Vercel
  
## Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn package manager
- `.env` file with Firebase configuration (see **Environment Variables**)

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/yourusername/campus-connect.git
cd campus-connect
```

## Install dependencies
``` 
npm install
# or
yarn install
```

## Environment Variables
Create a .env file in the root of the project with the following Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

⚠️ Warning: The application requires a .env file for Firebase configuration. Without it, certain features may not function properly.

## 4. Run the Application
Start the development server:

```
npm run dev
# or
yarn dev
```


The app will be available at `http://localhost:5173` by default.

The website is deployed at `https://campusconnect-five.vercel.app/` hosted by vercel.

## Happy connecting on `Campus Connect`!
