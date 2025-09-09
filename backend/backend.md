# Backend Documentation

This document provides an overview of the backend schemas and data for the Expense Budget Management application.

## MongoDB Schemas

### User Schema

This schema stores user information, including their profile details and authentication credentials.

```json
{
  "username": {
    "type": "string",
    "required": true,
    "unique": true,
    "trim": true,
    "minlength": 3
  },
  "email": {
    "type": "string",
    "required": true,
    "unique": true,
    "lowercase": true
  },
  "password": {
    "type": "string",
    "required": true,
    "minlength": 6
  },
  "avatar": {
    "type": "string",
    "default": "default-avatar.jpg"
  },
  "createdAt": {
    "type": "date",
    "default": "Date.now"
  }
}
```

### Transaction Schema

This schema stores all of the user's transactions, including income and expenses.

```json
{
  "user": {
    "type": "objectId",
    "ref": "User",
    "required": true
  },
  "type": {
    "type": "string",
    "enum": ["income", "expense"],
    "required": true
  },
  "category": {
    "type": "string",
    "required": true,
    "trim": true
  },
  "amount": {
    "type": "number",
    "required": true
  },
  "date": {
    "type": "date",
    "required": true
  },
  "description": {
    "type": "string",
    "trim": true
  },
  "createdAt": {
    "type": "date",
    "default": "Date.now"
  }
}
```

### Budget Schema

This schema stores the user's budgets for different categories.

```json
{
  "user": {
    "type": "objectId",
    "ref": "User",
    "required": true
  },
  "category": {
    "type": "string",
    "required": true,
    "unique": true,
    "trim": true
  },
  "amount": {
    "type": "number",
    "required": true
  },
  "spent": {
    "type": "number",
    "default": 0
  },
  "startDate": {
    "type": "date",
    "default": "Date.now"
  },
  "endDate": {
    "type": "date"
  },
  "createdAt": {
    "type": "date",
    "default": "Date.now"
  }
}
```

## Hardcoded User Data

Here are some hardcoded user documents that you can use to populate your `User` collection for testing purposes.

### User 1

```json
{
  "_id": {
    "$oid": "60d5f3f7a3b7a3b7a3b7a3b7"
  },
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "avatar": "https://example.com/avatars/avatar1.jpg",
  "createdAt": {
    "$date": "2025-09-15T10:00:00.000Z"
  }
}
```

### User 2

```json
{
  "_id": {
    "$oid": "60d5f3f7a3b7a3b7a3b7a3b8"
  },
  "username": "jane_doe",
  "email": "jane.doe@example.com",
  "password": "password456",
  "avatar": "https://example.com/avatars/avatar2.jpg",
  "createdAt": {
    "$date": "2025-09-16T11:30:00.000Z"
  }
}
```

### User 3

```json
{
  "_id": {
    "$oid": "60d5f3f7a3b7a3b7a3b7a3b9"
  },
  "username": "peter_jones",
  "email": "peter.jones@example.com",
  "password": "password789",
  "avatar": "https://example.com/avatars/avatar3.jpg",
  "createdAt": {
    "$date": "2025-09-17T14:00:00.000Z"
  }
}
```