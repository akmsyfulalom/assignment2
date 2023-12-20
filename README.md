# Mongoose Express CRUD Mastery Assignment

### Live Server Link: <a href="https://mongoose-express-crud-mastery-assignment.vercel.app">https://mongoose-express-crud-mastery-assignment.vercel.app</a>

### Run Locally:

- At first clone my github repo. then install all the package.
- To install all the package. go to terminal and comand

```npm
  npm i
```

- After Install all the package. run npm run start:dev to start the server.

```npm
npm run start:dev
```

### Routes:

- Create User Endpoint: **POST /api/users**
- Get User Endpoint: **GET /api/v1/users**
- Get User By Id Endpoint: **GET /api/users/:userId**
- Update User Endpoint: **PUT /api/users/:userId**
- Delete User Endpoint: **DELETE /api/users/:userId**
- Create Order for a Specific User Endpoint: **PUT /api/users/:userId/orders**
- Get Orders for a Specific User Endpoint: **GET /api/users/:userId/orders**
- Calculate Total Price for a Specific User Endpoint: **GET /api/users/:userId/orders/total-price**

### Instruction:

- **JSON Structure for Create User and Update User :**

```json
{
  "userId": "number",
  "username": "string",
  "password": "string",
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "age": "number",
  "email": "string",
  "isActive": "boolean",
  "hobbies": ["string", "string"],
  "address": {
    "street": "string",
    "city": "string",
    "country": "string"
  }
}
```

- **JSON Structure for Create Order :**

```json
{
  "productName": "string",
  "price": "number",
  "quantity": "number"
}
```
