# Authenticate Backend Developer Position

This project aims to create a REST API for a mobile app similar to popular apps that identify spam numbers or allow finding a person's name by searching for their phone number.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

## Features

### User Authentication and Profile Management

- **Register Route:** Users can register with a name, phone number, and password. An optional email address can also be provided.
- **Login Route:** Registered users can log in with their phone number and password.
- **Password Hashing & Verification:** Passwords are securely hashed and verified during login.
- **JWT Token Issuance:** Upon successful login, JWT tokens (access and refresh tokens) are issued for authentication.
- **Access Control:** Using passport-jwt, access to protected routes is provided only with a valid JWT token.
- **Error Handling:** Proper error management system is implemented for graceful handling of errors.
- **Database Integration:** PostgreSQL database is used with Sequelize ORM for efficient data storage and retrieval.
- **Data Validation:** Validators are implemented to ensure data integrity and security.
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
- **Retrieve Spam Numbers:** Users can retrieve a list of all marked spam numbers.

### Search Functionality

- **Search by Name:** Users can search for people by name in the global database.
- **Search by Phone Number:** Users can search for people by phone number in the global database.

### Security Enhancements

- **Helmet Middleware:** Various security headers such as Content Security Policy, Referrer Policy, HSTS, Frameguard, and X-Content-Type-Options are implemented using the Helmet middleware.
- **CORS Policy:** CORS (Cross-Origin Resource Sharing) policy is implemented to restrict unauthorized access to resources.
- **Refresh Token Rotation:** Refresh tokens are rotated to enhance security.
- **Refresh Token Management:** Proper management of refresh tokens is implemented to ensure secure authentication.
- **Request Validation:** Requests are validated to prevent unauthorized or malformed requests.

### Data Population

- **Populate Database with Sample Data:** A script is provided to populate the database with a diverse mix of sample data including users, contacts, and spam numbers.

### Performance and Security Enhancements

- **API Endpoint Optimization:** API endpoints are optimized for performance to ensure efficient handling of requests.
- **Security Best Practices:** Additional security best practices such as input validation, rate limiting, etc., are implemented to enhance security.
- **Thorough Testing:** Comprehensive testing is conducted to ensure the functionality and performance of the APIs under various scenarios.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/authenticate-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd authenticate-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up PostgreSQL database and update configuration in `config/config.json`.

5. Run the migration to create database tables:

   ```bash
   npx sequelize-cli db:migrate
   ```

6. Start the server:

   ```bash
   npm start
   ```

7. The server will be running at `http://localhost:3000`.

## API Documentation

Detailed API documentation including endpoints, request/response formats, and usage examples can be found [here](/docs/api.md).

## Testing

To run tests:

```bash
npm test
```

## Contributors

- [Your Name](https://github.com/yourusername)
- [Contributor 1](https://github.com/contributor1)
- [Contributor 2](https://github.com/contributor2)

## License

This project is licensed under the [MIT License](LICENSE).