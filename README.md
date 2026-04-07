# RePlate: Interactive System for Sustainable Food Redistribution

> **A simulation-based web application that models surplus food allocation and promotes sustainable decision-making through interactive gameplay.**

## 📖 Overview

Food waste and unequal distribution remain critical global challenges: while a significant portion of food is discarded, millions still face food insecurity.

**RePlate** is an interactive simulation that transforms this issue into a system-based experience. Instead of simply “playing a game,” users engage in **real-time decision-making**, allocating surplus food to appropriate distribution channels under constraints such as time and resource limitations.

By reframing food redistribution as an interactive system, this project explores how **UX design and simulation mechanics can influence awareness, behavior, and decision-making** around sustainability.


## 🧠 Design Thinking

This project is built on three core concepts:

- **System Thinking**  
  Models food redistribution as a dynamic system involving supply, timing, and allocation.

- **Behavioral Awareness**  
  Uses time pressure and feedback loops to simulate real-world urgency and consequences.

- **Sustainable Interaction**  
  Introduces alternative flows such as food processing (e.g., composting), encouraging environmentally responsible decisions.


## ✨ Features

- **Real-Time Allocation Simulation**  
  Users must quickly assign food items to appropriate delivery channels under time constraints.

- **Drag-and-Drop Interaction**  
  Intuitive UI interaction designed to reduce friction and enhance engagement.

- **Sustainability Mechanics**  
  Includes alternative handling systems (e.g., food transformation, waste processing).

- **Dynamic Feedback System**  
  Visual animations, collision detection, and audio cues reinforce user actions and outcomes.


## 🛠️ Tech Stack

- **Frontend**  
  HTML5, CSS3, JavaScript  
  `p5.js`, `p5.play` (rendering, animation, interaction logic)

- **Backend**  
  Node.js, Express.js (routing, static serving)

- **Other Tools**  
  `morgan`, `cookie-parser`

---
## 🏗️ Project Architecture

The project follows a decoupled architecture where the **Node.js/Express** backend handles the server environment and routing, while the **p5.js** engine manages the interactive simulation on the client side.

### 📂 Directory Structure

```text
REPLATE/
├── bin/
│   └── www             # Entry point: Starts the HTTP server
├── routes/
│   ├── index.js        # Main router for handling page requests
│   └── users.js        # Placeholder for user-related logic
├── public/             # Client-side assets (The core simulation)
│   ├── index.html      # Main application window
│   ├── project.js      # Core logic (p5.js sketch, physics, and gameplay)
│   ├── style.css       # UI styling and layout
│   ├── pic/            # Visual assets (Food items, UI icons)
│   └── *.mp3           # Audio feedback (Cargo, Yummy, Press, etc.)
├── app.js              # Express application configuration
└── package.json        # Project dependencies and scripts
```
---

## 📺 Demo Video
Click the image below to watch the project demonstration:

[![Watch the video](https://img.youtube.com/vi/mFSwJNVSjsM/0.jpg)](https://youtu.be/mFSwJNVSjsM)
