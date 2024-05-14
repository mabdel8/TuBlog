# TuBlog
![Home Page](https://github.com/mabdel8/TuBlog/blob/main/client/public/addscreensc.png)

TuBlog is a full-stack blog application built using the MERN stack (MongoDB, Express, React, Node.js). The app features user authentication, CRUD operations, and different categories for posts. Additionally, users can leave reviews on food spots and indicate their attendance for fun events.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

## Features

- User authentication (signup, login, logout)
- CRUD operations for blog posts
- Different categories for posts (e.g., fun, politics, sports, job, technology)
- Users can leave reviews on food spots
- Fun event posts with "I'll Be There!" button and attendance counter
- Responsive design using Tailwind CSS

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Axios
- Cheerio
- JWT (JSON Web Token)
- react-cookie
- React Router
- Tailwind CSS
- Vercel (for deployment)
- MongoDB Atlas (for database hosting)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/tublog.git
   cd tublog
   ```
2. **Install backend dependencies:**
   ```bash
   cd server
   npm install

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install


4. **Create a .env file in the server directory and add your environment variables:**
   ```bash
   TOKEN_KEY=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string


5. **Start the backend server:**
   ```bash
   cd ../server
   npm start

6. **Start the frontend development server:**
   ```bash
   cd ../client
   npm start

## Screenshots
### Food Page
![Food Page](https://github.com/mabdel8/TuBlog/blob/main/client/public/foodscreensc.png)

### Login Page
![Login Page](https://github.com/mabdel8/TuBlog/blob/main/client/public/loginscreensc.png)

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your improvements.
