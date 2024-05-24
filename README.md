Sure! Here's the updated README.md file with a section for future enhancements:

---

# SpamBee REST API

Welcome to **SpamBee API**, a robust REST API designed to empower mobile applications with spam detection and phone number lookup functionalities. Similar to popular apps in the market, SpamBee API allows users to determine if a phone number is associated with spam and to search for a person's name by entering their phone number.

## 👋 Introduction

SpamBee API is built to offer seamless integration with mobile applications seeking to enhance user privacy and security. Whether you're developing a messaging app, a caller ID service, or a contact management tool, SpamBee API provides the essential functionalities to identify and manage phone numbers effectively.

## 🔑 Key Features

- **User Authentication:** Secure registration and login functionality to authenticate users and protect their data.
- **Profile Management:** Options to view and update user profiles, ensuring accurate information.
- **Contact Management:** Capability to manage contacts, including searching for contacts by phone number.
- **Spam Detection:** Advanced algorithms to identify spam phone numbers and protect users from unwanted communications.

## 🧰 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

## ✨ Features

### User Authentication and Profile Management

- **Register Route:** Users can register with a name, phone number, and password. An optional email address can also be provided.
- **Login Route:** Registered users can log in with their phone number and password.
- **Profile Management:** Users can update their email, phone number, name, and password.
- **View User Profile:** Users can view their profile information after logging in.

### Contacts Management

- **Add Contact:** Users can add new contacts to their list.
- **Get Contact:** Users can retrieve a specific contact by its ID.
- **Get Contacts:** Users can retrieve all their contacts.
- **Delete Contact:** Users can delete a contact from their list.
- **Update Contact:** Users can update the details of a contact.

### Spam Management

- **Mark Number as Spam:** Users can mark a phone number as spam to help other users identify spam callers.

### Search Functionality

- **Search by Name:** Users can search for people by name in the global database.
- **Search by Phone Number:** Users can search for people by phone number in the global database.

### Others

- **Password Hashing & Verification:** Passwords are securely hashed and verified during login.
- **JWT Token Issuance:** Upon successful login, JWT tokens (access and refresh tokens) are issued for authentication.
- **Access Control:** Using passport-jwt, access to protected routes is provided only with a valid JWT token.
- **Error Handling:** Proper error management system is implemented for graceful handling of errors.
- **Database Integration:** PostgreSQL database is used with Sequelize ORM for efficient data storage and retrieval.
- **Data Validation:** Validators are implemented to ensure data integrity and security.

### 🔐 Security Enhancements

- **Helmet Middleware:** Various security headers such as Content Security Policy, Referrer Policy, HSTS, Frameguard, and X-Content-Type-Options are implemented using the Helmet middleware.
- **CORS Policy:** CORS (Cross-Origin Resource Sharing) policy is implemented to restrict unauthorized access to resources.
- **Refresh Token Rotation:** Refresh tokens are rotated to enhance security.
- **Refresh Token Management:** Proper management of refresh tokens is implemented to ensure secure authentication.
- **Request Validation:** Requests are validated to prevent unauthorized or malformed requests.

### ⚙️ Performance and Security Enhancements

- **API Endpoint Optimization:** API endpoints are optimized for performance to ensure efficient handling of requests.
- **Security Best Practices:** Additional security best practices such as input validation, rate limiting, etc., are implemented to enhance security.
- **Thorough Testing:** Comprehensive testing is conducted to ensure the functionality and performance of the APIs under various scenarios.

## 📌 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fk00750/authenticate.git
   ```

2. Navigate to the project directory:

   ```bash
   cd authenticate
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up PostgreSQL database and update configuration in `config/config.database.js`.

5. Run the migration to create database tables:

   ```bash
   npx sequelize-cli db:migrate
   ```

6. Start the server:

   ```bash
   npm start
   ```

7. The server will be running at `http://localhost:4001`.

## 📋 API Documentation

Detailed API documentation including endpoints, request/response formats, and usage examples can be found [here](https://authenticate-kx0v.onrender.com/api-docs).

## 🧪 Testing

To run tests:

```bash
npm run test
```

To test the application with the sample data, [Click Here](https://authenticate-kx0v.onrender.com/test-data)

## 🚀 Future Enhancements

To further improve the functionality and scalability of SpamBee API, the following features can be considered for future development:

- **Pagination:** Implement pagination for endpoints that return lists of data (e.g., contacts, search results) to handle large datasets more efficiently and improve response times.
- **Containerization:** Use Docker to containerize the application, ensuring consistent environments for development, testing, and production, and simplifying deployment processes.
- **Microservices Architecture:** Refactor the application into microservices to improve scalability, maintainability, and ease of deployment. Each service can handle a specific aspect of the application (e.g., user management, contacts management, spam detection).
- **IP Monitoring:** Implement IP monitoring and rate limiting to enhance security by detecting and preventing abuse or malicious activities. This includes tracking IP addresses for login attempts and requests to identify patterns of misuse.