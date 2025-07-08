# 🗳️ Voting Application

A backend Node.js-based Voting Application that manages user authentication, candidate records, and secure vote casting via APIs. Built using Express.js, MongoDB, and JWT for authentication.

---

## 🔧 Features

- 🧑‍💼 User and admin authentication with JWT
- 🗳️ Cast and manage votes securely
- 🧾 View candidate list and voting stats
- 🧱 Modular structure with routes, models, and controllers
- 🌐 Environment-based configuration using `.env`

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Structure**:
  - `server.js` – main entry point
  - `routes/`
    - `userroute.js` – handles user authentication and voting
    - `candidateroute.js` – handles candidate operations
  - `models/`
    - `user.js` – schema for voters/users
    - `candidate.js` – schema for election candidates
  - `db.js` – MongoDB connection
  - `.env` – stores sensitive environment variables

---

## 🚀 Getting Started

### 📦 Installation

```bash
git clone https://github.com/Pallavi-0622/voting-application.git
cd voting-application
npm install

⚙️ Environment Setup
Create a .env file in the root directory and add:

ini
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/votingDB
JWT_SECRET=your_jwt_secret

▶️ Run the App
bash
Copy code
node server.js
The server will run on http://localhost:5000/

🧪 Sample API Endpoints
POST /api/register – Register new user

POST /api/login – Login and receive token

GET /api/candidates – View all candidates

POST /api/vote – Submit a vote

📁 Project Structure
voting-application/
├── models/
│   ├── user.js
│   └── candidate.js
├── routes/
│   ├── userroute.js
│   └── candidateroute.js
├── .env
├── db.js
├── jwt.js
├── server.js
├── package.json
└── README.md
✍️ Author
Made with 💻 by Sahil Shaikh

📄 License
This project is licensed under the MIT License

🌟 Support
Star ⭐ the repo to support the project and share with others!
