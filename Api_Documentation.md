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




