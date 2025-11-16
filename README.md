# Skill Sphere Arena

Skill Sphere Arena is a gamified platform designed to help students showcase their skills, earn achievements, and climb the leaderboard. It provides a centralized hub for students to track their progress, get recognized for their accomplishments, and even get career guidance from an AI-powered chatbot.

## Live Demo

[Link to the deployed application]([https://your-deployment-link.com](https://skill-sphere-arena.vercel.app/)) 

## Features

*   **Gamified Leaderboard:** Students can see their rank based on points earned from achievements.
*   **Achievement Tracking:** Students can submit their achievements, which are then approved by faculty members.
*   **Student Profiles:** Each student has a public profile showcasing their rank, achievements, and skills.
*   **AI Career Bot:** An integrated chatbot that provides career guidance and answers student's questions.
*   **Role-Based Access Control:** Different roles for students, faculty, and admins with different levels of permissions.
*   **Real-time Updates:** The application uses Firebase Firestore for real-time data synchronization.

## Workflow Summary

The application follows a role-based workflow for students, faculty, and administrators.

1.  **Authentication:** Users sign in using their credentials. The system distinguishes between `student`, `faculty`, and `admin` roles, directing them to their respective dashboards.

2.  **Student Dashboard:** Upon logging in, a student sees an overview of their profile, including their current rank, total points, and a summary of their achievements.

3.  **Achievement Submission:** Students can submit new achievements they have earned. These submissions enter a pending state, awaiting verification.

4.  **Faculty Verification:** Faculty members have a dedicated interface to review and approve or reject pending achievement submissions from students.

5.  **Leaderboard & Profiles:** Once an achievement is approved, the student's score is updated, which in turn affects their rank on the global leaderboard. All approved achievements are displayed on the student's public profile.

6.  **AI Career Guidance:** Students can access the "Career Bot," an AI-powered counselor, to ask questions and receive personalized career advice based on their skills and interests.

## Technology Stack

*   **Frontend:**
    *   **React:** A JavaScript library for building user interfaces.
    *   **Vite:** A fast build tool and development server.
    *   **TypeScript:** A typed superset of JavaScript.
    *   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
    *   **shadcn/ui:** A collection of re-usable components built with Radix UI and Tailwind CSS.
    *   **React Router:** For client-side routing.
    *   **TanStack Query:** For data fetching and state management.
*   **Backend:**
    *   **Firebase:** A comprehensive platform for building web and mobile applications.
        *   **Firestore:** A NoSQL database for real-time data storage.
        *   **Authentication:** For user authentication and management.
*   **Deployment:** Vercel (or your preferred hosting provider)

## Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A Firebase project

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/skill-sphere-arena.git
    cd skill-sphere-arena
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Firebase:**

    *   Create a new Firebase project.
    *   Enable Firestore and Authentication.
    *   Create a `.env.local` file in the root of the project and add your Firebase configuration:

        ```
        VITE_FIREBASE_API_KEY=your-api-key
        VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
        VITE_FIREBASE_PROJECT_ID=your-project-id
        VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
        VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
        VITE_FIREBASE_APP_ID=your-app-id
        ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application should now be running on `http://localhost:5173`.

## Project Structure

```
skill-sphere-arena/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Entry point of the application
│   └── ...
├── package.json
└── ...
```

## Firebase Integration

This project is tightly integrated with Firebase. Before running the application, make sure you have a Firebase project set up with Firestore and Authentication enabled. You will also need to configure the security rules for your Firestore database to ensure data integrity.
