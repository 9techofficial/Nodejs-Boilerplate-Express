# Nodejs Boilerplate Express

**Nodejs Boilerplate Express** is a simple, scalable MVC framework designed to help developers create RESTful APIs quickly. This boilerplate utilizes popular npm packages and provides a well-structured foundation for building secure and efficient APIs with Node.js and Express.

## Features

- **MVC Architecture**: Provides clear separation of concerns for maintainable and scalable development.
- **JWT Authentication**: Easily integrate secure authentication mechanisms with JSON Web Tokens (JWT).
- **MongoDB Support**: Comes with Mongoose to handle MongoDB object modeling and queries.
- **Environment Configuration**: Utilizes `dotenv` for easy environment variable management.
- **Logging**: Integrated logging with Winston for enhanced error tracking and debugging.
- **Cross-Origin Resource Sharing (CORS)**: Enable CORS using `cors` middleware for handling cross-origin requests.
- **Middleware Support**: Pre-configured with common middleware for parsing requests, handling compression, and parsing cookies.

## Technologies & Dependencies

The project uses the following npm packages:

### Core Dependencies
- **bcryptjs**: Password hashing.
- **body-parser**: Middleware for parsing incoming request bodies.
- **compression**: Middleware for compressing response bodies.
- **cookie-parser**: Middleware for parsing cookies.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: Loads environment variables from `.env` file.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **jsonwebtoken**: Secure authentication using JWT tokens.
- **moment**: Library for date manipulation.
- **mongoose**: MongoDB object modeling and queries.
- **winston**: A versatile logging library.

### Development Dependencies
- **@types** packages: TypeScript type definitions for various packages.
- **cross-env**: Manage environment settings across different platforms.
- **nodemon**: Automatically restart the server during development.
- **ts-node**: TypeScript execution environment.
- **typescript**: For static type-checking in JavaScript.

## Installation

1. Clone the repository:

    ```bash
    https://github.com/9techofficial/Nodejs-Boilerplate-Express.git
    ```

2. Navigate to the project directory:

    ```bash
    cd nodejs-boilerplate-express
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and configure your environment variables. Example:
    
    ```bash
    NODE_ENV=development
    PORT=4000
    DB_URI=mongodb://localhost:27017/yourdatabase
    JWT_SECRET=your_jwt_secret_key
    APP_URL=http://localhost:3000
    ```

## Usage

1. Start the development server:

    ```bash
    npm run dev
    ```

    This will start the server using **nodemon** with hot-reloading enabled.

2. For production, build the TypeScript and start the server:

    ```bash
    npm run build
    npm start
    ```

## Project Structure

The project follows the MVC (Model-View-Controller) structure:

## Sponsor

If you find this project helpful and want to support its development, consider becoming a sponsor! Your contributions will help maintain the project and improve future features.

[![Sponsor](https://img.shields.io/badge/Sponsor-❤-red)](https://github.com/sponsors/9techofficial)

Any amount is greatly appreciated! 🙌

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
