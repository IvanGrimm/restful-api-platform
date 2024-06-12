# RESTful API Platform

This is a simple RESTful API platform for managing resources such as users or products. It includes authentication with JWT (JSON Web Tokens) and a user interface built with React.

## Features

- User registration and authentication
- CRUD operations for managing users
- Protected routes using JWT authentication
- User interface with React

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- React
- React Router
- Axios

## Getting Started

1. Clone the repository:

```
git clone https://github.com/IvanGrimm/restful-api-platform.git
```

2. Install dependencies for both the server and client:

```
cd restful-api-platform/server
npm install

cd ../client
npm install
```

3. Set up the MongoDB database:
   
   - Install MongoDB if you haven't already: [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)
   - Start MongoDB server
   - Create a new database named `restful-api` or use an existing one.

4. Start the server and client:

```
cd ../server
npm start

cd ../client
npm start
```

5. Open your browser and go to `http://localhost:3001` to access the application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
