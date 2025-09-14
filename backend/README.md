# User Authentication API Documentation

This API provides endpoints for user registration, login, and logout. All endpoints are prefixed with `/api/users`.

## Endpoints

---

## 1. Register User

- **URL:** `/api/users/register`
- **Method:** `POST`
- **Description:** Registers a new user and returns a JWT token and user info.
- **Request Body:**
  ```json
  {
    "name": "string (min 3 chars)",
    "email": "string (valid email, min 5 chars)",
    "password": "string (min 6 chars)"
  }
  ```
- **Responses:**
  - `201 Created`
    ```json
    {
      "token": "<jwt_token>",
      "user": { ...userObject }
    }
    ```
  - `400 Bad Request` (Validation error or user already exists)
    ```json
    {
      "errors": [ ... ]
    }
    or
    {
      "message": "User already exist"
    }
    ```

---

## 2. Login User

- **URL:** `/api/users/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token and user info.
- **Request Body:**
  ```json
  {
    "email": "string (valid email, min 5 chars)",
    "password": "string (min 6 chars)"
  }
  ```
- **Responses:**
  - `200 OK`
    ```json
    {
      "token": "<jwt_token>",
      "user": { ...userObject }
    }
    ```
  - `400 Bad Request` (Validation error)
    ```json
    {
      "errors": [ ... ]
    }
    ```
  - `401 Unauthorized` (Invalid credentials)
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

---

## 3. Logout User

- **URL:** `/api/users/logout`
- **Method:** `GET`
- **Description:** Logs out the user by blacklisting the JWT token and clearing the cookie.
- **Headers:**
  - `Authorization: Bearer <jwt_token>` (if not using cookies)
- **Responses:**
  - `200 OK`
    ```json
    {
      "message": "Logged out"
    }
    ```
  - `401 Unauthorized` (If token is missing, invalid, or blacklisted)
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

## Data Requirements

- All endpoints expect data in JSON format.
- For registration, all fields (`name`, `email`, `password`) are required.
- For login, both `email` and `password` are required.
- Passwords must be at least 6 characters. Name must be at least 3 characters. Email must be valid and at least 5 characters.

---

## Example Usage

### Register
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Logout
```http
GET /api/users/logout
Authorization: Bearer <jwt_token>
```

---

For any error, the API will return a JSON object with an appropriate message or errors array.
