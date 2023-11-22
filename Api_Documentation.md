# Farmer API Documentation

## 1. Signup

### Endpoint
- **POST /farmers/signup**

### Request Body
- **firstName** (string, required): email address.
- **lastName** (string, required): email address.
- **email** (string, required): email address.
- **password** (string, required): password (must contain only letters and numbers, at least 6 characters long).
- **confirmPassword** (string, required): (same as password)

### Response
- **Success (200 OK)**

  ```json
  {
    "status": "Success",
    "message": "User signup successful",
    "data": {
      "user": {
        "firstName": "first",
        "lastName": "test",
        "email": "user@example.com",
        "password": "hashed_password",
        "confirmPassword": "hashed_password",
        "_id": "user_id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    }
  }
  ```

**Conflict (409 Conflict)**
```json
{
  "status": "failed",
  "message": "An account with this email already exists"
}
```

**Bad Request (400 Bad Request)**
``` json
{
  "error": "Invalid input data"
}
```



## 2. Signin

## Endpoint
- **POST /farmers/signin**

### Request Body
- **email** (string, required): email address.
- **password** (string, required): password.

### Response
- **Success (200 OK)**

```json
{
  "status": "success",
  "message": "User login successful",
  "data": {
    "email": "user@example.com",
    "password": "hashed_password",
    "_id": "user_id",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "login_token": "generated_jwt_token"
}
```


**Bad Request (400 Bad Request)**

```json
{
  "status": "failed",
  "message": "Invalid email or password"
}
```






# Produce API Documentation

The Produce API provides endpoints for managing produce listings for users.

## Base URL


## Authentication

- To access the produce endpoints, authentication is required. Include a valid authentication token in the `Authorization` header of your HTTP request.


## Add Produce Listing

### `POST /produce/create`

#### Request

- **URL:** `http://your-api-base-url.com/produce/create`
- **Method:** `POST`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_AUTH_TOKEN`

#### Request Body

```json
{
  "produceName": "Tomatoes",
  "quantity": 20
}
```

```json
{
  "status": "success",
  "message": "Produce listing added successfully",
  "data": {
    "_id": "produceId",
    "produceName": "Tomatoes",
    "quantity": 20,
    "farmer": "userId",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```


## Get Produce Listings
**GET /produce/list/:userId**

Response
```json
{
  "status": "success",
  "message": "Produce listings retrieved successfully",
  "data": [
    {
      "_id": "produceId1",
      "produceName": "Tomatoes",
      "quantity": 20,
      "farmer": "userId",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
    {
      "_id": "produceId2",
      "produceName": "Apples",
      "quantity": 15,
      "farmer": "userId",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```


## Update Produce Listing
**PUT /produce/update/:userId/:produceId**
Request Body

```json
{
  "produceName": "Updated Tomatoes",
  "quantity": 25
}
```


**Response**
```json
{
  "status": "success",
  "message": "Produce listing updated successfully",
  "data": {
    "_id": "produceId",
    "produceName": "Updated Tomatoes",
    "quantity": 25,
    "farmer": "userId",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```


## Delete Produce Listing
**DELETE /produce/delete/:userId/:produceId**
Request

**Response**

```json
{
  "status": "success",
  "message": "Produce deleted successfully"
}
```


**Error Handling**
- If authentication fails, the API will respond with a 401 Unauthorized status and a JSON object containing the error message.
```json
{
  "error": "Unauthorized - Token missing"
}
```






# Chat API Documentation

This API allows users to interact with an OpenAI language model in a chat-like format.

## Base URL


**Authentication**
- All requests to the /chat endpoint require valid authentication. Include the user's authentication token in the Authorization header as a bearer token.



## Chat Endpoint

### `POST /chat`

#### Request

Send a POST request to the `/chat` endpoint to interact with the chatbot.

- **URL:** `http://your-api-base-url.com/chat`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_AUTH_TOKEN`

#### Request Body

```json
{
  "userInput": "Hello, what is the capital of France?"
}
```

- userInput (string, required): The user's input for the chatbot.
Response

The API will respond with a JSON object containing the chatbot's response.

```json
{
  "response": "The capital of France is Paris."
}
```

**Error Handling**
- authentication fails, the API will respond with a 401 Unauthorized status and a JSON object containing the error message.

``` json
{
  "error": "Unauthorized - Token missing"
}
```

- If there is an internal server error during the chat interaction, the API will respond with a 500 Internal Server Error status and a JSON object containing the error message.

```json
{
  "error": "Internal server error."
}