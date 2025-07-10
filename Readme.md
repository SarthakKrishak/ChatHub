<p align="center">
  <img src="./frontend/public/image1.png" alt="ChatHub Logo" width="100" />
</p>

# ChatHub

**ChatHub** is a modern, real-time chat application designed for seamless, anonymous communication. Instantly connect and chat with anyone online—no prior connections, no personal details required.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Features

- **Anonymous Real-Time Chat:** Connect and chat instantly with any online user, maintaining privacy and anonymity.
- **Modern User Interface:** Clean, responsive, and intuitive UI built with React and Tailwind CSS.
- **Online User Detection:** Automatically displays users who are currently online.
- **High Performance:** Optimized for speed and simplicity.
- **Secure Authentication:** User sessions managed with JWT for secure access.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Real-Time Messaging:** Socket.IO
- **Authentication:** JSON Web Tokens (JWT)

---

## How It Works

Upon logging in, users become visible to others who are online. Any user can initiate a chat with another online user—no need for prior connections or sharing of personal information. All conversations remain anonymous unless users choose to disclose their details.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SarthakKrishak/ChatHub.git
   cd ChatHub
   ```

2. **Install dependencies for both frontend and backend:**

   **Frontend:**

   ```bash
   cd frontend
   npm install
   ```

   **Backend:**

   ```bash
   cd ../backend
   npm install
   ```

### Running the Application

**Start the Frontend:**

```bash
cd frontend
npm run dev
```

**Start the Backend:**

```bash
cd backend
```

```bash
npm i
```

```bash
node index.js
```



