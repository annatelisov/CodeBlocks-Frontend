# Code Blocks App - Frontend

This is the frontend for the Code Blocks App, an online coding web application designed to help a JS lecturer follow his student's progress. The app allows users to choose and interact with code blocks in real-time.

## Features

- **Lobby Page**: Displays a list of code blocks that users can choose from.
- **Code Block Page**: Allows users to view and edit code blocks with syntax highlighting.
  - The first user to open a code block is assigned the role of "mentor", and subsequent users are "students".
  - Students can edit the code, and changes are displayed in real-time to all users in the room.
  - If the code is changed to match the pre-defined solution, a smiley face is displayed.
  - The mentor's view is read-only, while students can edit the code.
  - The number of students in the room is displayed at all times.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Socket.IO**: Real-time communication between users.
- **Axios**: Promise-based HTTP client for making requests to the backend API.
- **React Router**: For handling navigation between pages.
- **Heroku**: Deployment platform.

## Getting Started

### Prerequisites

- Node.js and npm installed on local machine.

### Runing app localy

- npm install
- Runing localy at http://localhost:3000

### Deployment 

- Deploy at Heroku platform.
- App's Frontend url: https://frontendcodeblocksapp-d21f3e724ed4.herokuapp.com/
- App's Backend url: https://backendcodeblocksapp-02d7e23a5120.herokuapp.com/

#  Thanks for interesting my app! #
