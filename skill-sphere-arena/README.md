# Skill Sphere Arena

Skill Sphere Arena is a web application designed for users to showcase their skills and achievements. It provides a platform for users to submit their accomplishments for verification and features an administrative dashboard for reviewing and managing these submissions.

## Live Demo

*https://skill-sphere-arena.vercel.app/*

## Core Features

- **User Authentication:** Secure sign-up and login functionality using Firebase Authentication.
- **Achievement Submission:** Users can submit their achievements, including a title, description, and an optional link to evidence (e.g., a Google Drive link to a certificate or image).
- **Profile Page:** A dedicated page for each user to view their submitted achievements and their status (Pending, Approved, Rejected).
- **Admin Review Panel:** A secure area for administrators to review, approve, or reject user submissions.
- **Real-time Updates:** Built with Firebase Firestore to provide real-time updates on the status of submissions.

## Technology Stack

This project is built with a modern, type-safe, and scalable technology stack:

- **Frontend:** **React** & **Vite**
- **Language:** **TypeScript**
- **Backend as a Service (BaaS):** **Firebase**
  - **Authentication:** Firebase Authentication
  - **Database:** Cloud Firestore
  - **Data Schema & SDK:** Firebase DataConnect
- **Styling:** **Tailwind CSS**
- **UI Components:** **shadcn/ui**
- **Data Fetching/State Management:** **TanStack Query (React Query)**
- **Deployment:** **Vercel**

## Local Development Setup

To run this project on your local machine, follow these steps.

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd skill-sphere-arena
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Firebase

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  In your project dashboard, click on **"Add app"** and select the **Web** icon (`</>`).
3.  Follow the setup instructions, and when you see the `firebaseConfig` object, copy the keys and values.
4.  In the root of the `skill-sphere-arena` directory, create a new file named `.env.local`.
5.  Paste your Firebase config into the `.env.local` file, formatting it like the example below. **Make sure to prefix each variable with `VITE_`** as required by Vite.

    ```
    # .env.local

    VITE_FIREBASE_API_KEY="your-api-key"
    VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
    VITE_FIREBASE_PROJECT_ID="your-project-id"
    VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
    VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
    VITE_FIREBASE_APP_ID="your-app-id"
    ```

6. Enable Firestore in your Firebase project console.

### 4. Start the Development Server

Now you can start the local development server.

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Deployment

This project is configured for easy deployment to [Vercel](https://vercel.com/).

To deploy to production, run the following command from the root of the `skill-sphere-arena` directory:

```bash
vercel --prod
```

## Project Structure

- `/src/components`: Contains reusable UI components.
- `/src/pages`: The main pages of the application (e.g., Profile, Admin, Login).
- `/src/context`: Holds the React Context for authentication state.
- `/src/firebase.ts`: Initializes the Firebase app and services.
- `/dataconnect`: Contains the Firebase DataConnect schema (`dataconnect.schema.graphql`) and the auto-generated SDK for type-safe database interactions.
