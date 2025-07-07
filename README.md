# Wanderlust - Modern Property Rental Platform 🏠

<div align="center">
  <img src="https://img.shields.io/badge/Status-Live-brightgreen" alt="Status"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License"/>
  <img src="https://img.shields.io/badge/Node.js-green" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-black" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-4DB33D" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/EJS-purple" alt="EJS"/>
</div>

<div align="center">
  <p>A full-stack Airbnb-inspired property rental platform with beautiful UI, secure authentication, and seamless booking experiences.</p>
  <p><strong>⭐ Star this repo if you find it useful! ⭐</strong></p>
</div>

---

## 📋 Table of Contents

- [📸 Demo](#-demo)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [🔄 Application Flow](#-application-flow)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📝 API Endpoints](#-api-endpoints)
- [📊 Database Schema](#-database-schema)
- [🧩 Key Components](#-key-components)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 📸 Demo

<div align="center">
  <p><i>Add screenshots of your application's key pages/features here</i></p>
  
  ```
  Home Page | Listing Page | User Dashboard
  ```
</div>

---

## ✨ Features

### User Authentication & Management
- Secure signup and login with Passport.js
- User profile management
- Password reset functionality

### Property Listings
- Create, edit, and delete property listings
- Upload multiple images with Cloudinary integration
- Detailed property descriptions and amenities
- Location mapping with geospatial coordinates

### Search & Discovery
- Advanced search with multiple filters
- Location-based property discovery
- Price range filtering
- Amenities-based filtering

### Reviews & Ratings
- Leave reviews and ratings for properties
- View property rating statistics
- Host response system

### UI/UX
- Responsive design for all devices
- Interactive maps for property locations
- Real-time validation and feedback
- Flash notifications for user actions

### Security
- Data validation with Joi
- CSRF protection
- Secure session management
- Authorization middleware

---

## 🛠️ Tech Stack

### Frontend
- **View Engine:** EJS (Embedded JavaScript)
- **Styling:** CSS3, Bootstrap
- **Client-side Scripting:** JavaScript (ES6+)
- **Maps Integration:** MapBox API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Passport.js (Local Strategy)
- **Image Storage:** Cloudinary
- **Validation:** Joi
- **Session Management:** express-session with Connect-Mongo

### DevOps & Tools
- **Version Control:** Git
- **Deployment:** Heroku/Vercel
- **Environment Variables:** dotenv
- **Error Handling:** Custom middleware

---

## 🏗️ Architecture

The application follows the MVC (Model-View-Controller) architecture:

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Browser   │ ──────►   Routes    │ ──────►  Controller │
└─────────────┘       └─────────────┘       └──────┬──────┘
       ▲                                           │
       │                                           ▼
┌──────┴──────┐                            ┌─────────────┐
│    Views    │ ◄─────────────────────────┐│    Model    │
└─────────────┘                            └─────────────┘
                                                  │
                                                  ▼
                                           ┌─────────────┐
                                           │  Database   │
                                           └─────────────┘
```

### Data Flow
1. Client makes a request to a specific route
2. Route forwards the request to the appropriate controller
3. Controller processes the request, interacts with models as needed
4. Models interact with the database and return data
5. Controller processes the data and renders the view
6. View is returned to the client

---

## 🔄 Application Flow

```
┌──────────────────┐     ┌──────────────┐     ┌─────────────────┐
│   User Signup    │────►│  User Login  │────►│  Browse Listings │
└──────────────────┘     └──────────────┘     └─────────┬───────┘
                                                       │
┌──────────────────┐     ┌──────────────┐              ▼
│  Manage Profile  │◄────│ Create/Edit  │◄────┌─────────────────┐
└──────────────────┘     │   Listing    │     │ View Listing    │
                         └──────────────┘     └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  Leave Review   │
                                              └─────────────────┘
```

---

## 📁 Project Structure

```
├── app.js                # Main application entry point
├── cloudConfig.js        # Cloudinary configuration
├── middleware.js         # Custom middleware functions
├── schema.js             # Joi validation schemas
├── controllers/          # Application logic
│   ├── listings.js       # Listing controller functions
│   ├── reviews.js        # Review controller functions
│   └── users.js          # User authentication & management
├── init/                 # Database initialization
│   ├── data.js           # Seed data
│   └── index.js          # Seeding script
├── models/               # Database schemas
│   ├── listing.js        # Listing model
│   ├── review.js         # Review model
│   └── user.js           # User model
├── public/               # Static assets
│   ├── css/              # Stylesheets
│   └── js/               # Client-side JavaScript
├── routes/               # API routes
│   ├── listing.js        # Listing routes
│   ├── review.js         # Review routes
│   └── user.js           # User routes
├── utils/                # Utilities
│   ├── expressError.js   # Error handling
│   └── wrapAsync.js      # Async wrapper
└── views/                # EJS templates
    ├── layouts/          # Page layouts
    ├── includes/         # Reusable components
    ├── listings/         # Listing views
    └── users/            # User authentication views
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)
- Cloudinary account

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory:

   ```env
   MONGO_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   SESSION_SECRET=your_session_secret
   MAPBOX_TOKEN=your_mapbox_token
   PORT=3000
   ```

4. **Seed the database (optional):**

   ```sh
   node init/index.js
   ```

5. **Start the server:**

   ```sh
   npm start
   ```

   For development with auto-reload:

   ```sh
   npm run dev
   ```

6. **Access the application:**

   Open your browser and visit `http://localhost:3000`

---

## 📝 API Endpoints

### Authentication

- `POST /register` - User registration
- `POST /login` - User login
- `GET /logout` - User logout

### Listings

- `GET /listings` - Get all listings
- `POST /listings` - Create new listing
- `GET /listings/:id` - Get specific listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews

- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

---

## 📊 Database Schema

### User Model

```js
{
  email: String,
  username: String,
  password: String (hashed),
  listings: [{ type: ObjectId, ref: 'Listing' }]
}
```

### Listing Model

```js
{
  title: String,
  description: String,
  price: Number,
  location: String,
  geometry: {
    type: { type: String },
    coordinates: [Number]
  },
  images: [{ url: String, filename: String }],
  owner: { type: ObjectId, ref: 'User' },
  reviews: [{ type: ObjectId, ref: 'Review' }]
}
```

### Review Model

```js
{
  comment: String,
  rating: Number,
  author: { type: ObjectId, ref: 'User' }
}
```

---

## 🧩 Key Components

### Authentication System

The authentication system uses Passport.js with a local strategy for username/password authentication. Password hashing is handled by bcrypt for security.

### Image Upload

Images are uploaded to Cloudinary and references are stored in the database. This allows for efficient image storage and delivery.

### Geolocation

Property locations are geocoded using the Mapbox API, allowing for map displays and location-based searches.

### Error Handling

Custom error handling middleware captures and processes errors, providing user-friendly messages and appropriate HTTP status codes.

---

## 🤝 Contributing

I welcome contributions to improve Wanderlust! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -am 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding style and includes appropriate tests.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Created with ❤️ by Sahil Gupta</p>
  <p>© 2025 Wanderlust. All rights reserved.</p>
</div>