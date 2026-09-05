# 🏡 Homgobnb

### Gateway to Unforgettable Experiences

Homgobnb is a full-stack property listing web application inspired by modern vacation-rental platforms. It allows users to explore property listings, create and manage their own listings, upload property images, leave reviews and ratings, and view property locations on an interactive map.

The application is built using **Node.js, Express.js, MongoDB, Mongoose, EJS, Passport.js, Cloudinary, Multer, MapTiler, Leaflet, Joi, and Bootstrap**.

---

## 📌 Overview

Homgobnb provides a complete property-listing workflow where authenticated users can:

- Browse available properties
- View detailed property information
- Create new property listings
- Upload property images
- Edit and delete their own listings
- Register and log in securely
- Leave ratings and reviews
- Delete their own reviews
- View property locations on an interactive map
- Receive success and error feedback through flash messages

The application follows an **MVC-style architecture** with separate models, controllers, routes, middleware, and EJS views.

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration and login
- Secure authentication using **Passport.js**
- Password authentication using `passport-local-mongoose`
- Persistent login sessions
- MongoDB-backed session storage
- Protected routes for authenticated users
- Ownership-based authorization for listings
- Review-author authorization
- Automatic redirection to the originally requested page after login

---

### 🏠 Property Listings

Users can manage property listings through complete CRUD operations:

- Create a listing
- View all listings
- View individual listing details
- Edit existing listings
- Delete listings
- Store property title, description, price, location, and country
- Associate listings with their owners

Each listing is associated with its creator through a MongoDB relationship.

---

### 🖼️ Image Uploads

Homgobnb supports property image uploads using:

- **Multer** for handling multipart form uploads
- **Cloudinary** for cloud-based image storage
- `multer-storage-cloudinary` for integrating Multer with Cloudinary

If a user does not upload an image, the application can use a configured default listing image.

Supported image formats include:

- PNG
- JPG
- JPEG

---

### ⭐ Reviews & Ratings

Users can interact with listings through a review and rating system.

Features include:

- 1–5 star ratings
- Written comments
- Review authorship
- Review deletion by the review author
- MongoDB relationships between users, listings, and reviews
- Automatic cleanup of associated reviews when a listing is deleted

---

### 🗺️ Interactive Maps

Homgobnb integrates location-based functionality using:

- **MapTiler Geocoding API**
- **Leaflet.js**

When a listing is created, its location and country are used to perform geocoding and retrieve geographic coordinates.

The coordinates are stored using a GeoJSON `Point` structure and displayed on an interactive Leaflet map.

The listing page includes a custom property marker and automatically centers the map around the property's coordinates.

---

### ✅ Form Validation

The application performs server-side validation using **Joi**.

Listing validation includes:

- Title
- Description
- Location
- Country
- Price
- Image information

Review validation includes:

- Rating between 1 and 5
- Required comment

This prevents invalid data from being submitted to the application.

---

### ⚠️ Error Handling

Homgobnb includes centralized error handling using a custom `ExpressError` class.

The application also uses an asynchronous route wrapper to forward rejected promises to Express's error-handling middleware.

This helps keep asynchronous controller code cleaner and avoids repetitive `try/catch` blocks.

---

### 💬 Flash Messaging

The application uses `connect-flash` to provide user feedback for actions such as:

- Successful login
- Successful logout
- Listing creation
- Listing updates
- Listing deletion
- Review creation
- Review deletion
- Authentication errors
- Invalid or missing listings

---

### 📱 Responsive UI

The frontend uses:

- EJS templates
- Bootstrap
- Custom CSS
- Font Awesome
- Responsive layouts

The application includes reusable components such as:

- Navbar
- Footer
- Flash messages
- Authentication pages
- Listing cards
- Listing forms
- Property detail pages

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- EJS
- Bootstrap
- Font Awesome
- Leaflet.js

### Backend

- Node.js
- Express.js
- EJS
- Passport.js
- Passport Local
- Express Session
- Connect-Mongo
- Connect-Flash

### Database

- MongoDB
- Mongoose

### Cloud & APIs

- Cloudinary
- MapTiler Geocoding API
- Leaflet Maps

### Validation & Middleware

- Joi
- Multer
- Multer Storage Cloudinary
- Method Override

### Development Tools

- Git
- GitHub
- VS Code
- npm

---

## 🏗️ Application Architecture

Homgobnb follows an **MVC-inspired architecture** to keep application logic organized.

```text
User Request
     │
     ▼
   Routes
     │
     ▼
 Middleware
     │
     ├── Authentication
     ├── Authorization
     ├── Validation
     └── File Upload
     │
     ▼
 Controllers
     │
     ▼
   Models
     │
     ▼
   MongoDB
     │
     ▼
    EJS
     │
     ▼
   Browser

Homgobnb/
│
├── controllers/
│   ├── listings.js
│   ├── review.js
│   └── user.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listings.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   │
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── show.ejs
│   │   ├── edit.ejs
│   │   └── error.ejs
│   │
│   └── users/
│       ├── login.ejs
│       └── signup.ejs
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── cloudConfig.js
├── middleware.js
├── schema.js
├── app.js
├── package.json
└── README.md

# 👨‍💻 Author

**Abhyudai Singh**

B.Tech — Computer Science & Engineering (Artificial Intelligence & Machine Learning)  
Vellore Institute of Technology, Bhopal
