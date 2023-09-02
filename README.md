# Node.js backend application - project structure setup

My preferred Node.js backend project setup. Codebase is organized keeping in mind both development and production environments.

## Table Of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Tech stack](#tech-stack)
  - [Installation](#installation)
- [Usage/Example](#Usage/Examples)
- [Contributing](#contributing)
- [Feedback](#feedback)
- [License](#license)
- [Authors](#authors)

## Getting started

### Prerequisites

Basic familarity with Git, Node.js and npm.  
Basic familarity with server-side application development using Node.js and Express.js.  
Basic familarity with development and production environments for Node.js backend applications.

### Tech Stack

**Server:** Node.js & xpress.js  
**Database:** MongoDB

### Installation

Clone the project

```bash
git clone https://github.com/jaimin1618/nodejs-backend.git
```

Go to the project directory

```bash
cd nodejs-backend
```

Install dependencies

```bash
npm install
```

Setup environment variables & fill environment variables in .env file.

```bash
cp .env.example .env
```

Start the server

```bash
npm run server
```

## Usage/Examples

#### development phase practices.

- Keep the **_server.js_** file as it is during development stage.
- Configure environment variables **_.env_** and constants file **_config/constants.js_**
- Organize endpoints/routes in multiple files & wrap the controller with AsyncHandler, it will deal with try {} catch(e) {} wrapping of async program errors.

  ```nodejs
  router.use(
    "/",
    AsyncHandler(async (req, res) => {
      res.json(
        ApiResponse("Api Running Successfully.", null, StatusCodes.CREATED)
      );
    })
  );
  ```

- Use common api response structure for all endpoints - as shown in below example.

  ```nodejs
    res.json(
      ApiResponse("message", data, StatusCode)
    );
  ```

- Use common api error response structure to throw errors - as shown in below example.

  ```nodejs
    if (!authenticate) {
      throw new ApiError("Invalid credentials!", StatusCodes.UNAUTHORIZED, {
      credentials: { email, password },
      });
    }
  ```

- Let the middleware handle BAD_REQUEST errors.
  ```nodejs
  router.post(
    "/login",
    AuthRoutesValidations.loginValidation, // request validators
    HandleBadRequest, // BAD REQUEST - 400 middleware handler
    AuthController.login
  );
  ```

#### Moving to production stage.

- Get the SSL certificate files chain.pem, privkey.pem and cert.pem and put them inside **_config/_** folder. You can use Certbot CLI for getting SSL certificate from letsencrypt.
- Uncomment the lines with comment _"for production use"_ inside **_server.js_** file.
- Configure environment variables inside **_.env_** file.
- Start the server with following commands.

```bash
npm run server
```

or using PM2 - Node.js process manager

```bash
sudo pm2 start server.js --name="server"
```

## Contributing

Contributions are always welcome! If you'd like to contribute to this project, please follow these guidelines to ensure a smooth and collaborative process.

#### Setup project locally

1. Fork the repository to your GitHub account.

2. Clone the forked repository to your local machine:

```bash
git clone https://github.com/your-username/your-project.git
```

3. Clone the forked repository to your local machine:

```bash
git checkout -b feature/your-feature
```

4. Make your changes, additions, or bug fixes.

#### Submitting a Pull Request

5. Commit your changes with a descriptive commit message:

```bash
git commit -m "Add feature: your-feature"
```

6. Push your changes to your forked repository:

```bash
git push origin feature/your-feature
```

7. Create a pull request (PR) from your branch to the main repository. Be sure to provide a clear and detailed description of your changes in the PR. Participate in the discussion and address any feedback or comments received on your PR.

## Feedback

If you have any feedback, please reach out to me at jaimin.chokhawala@gmail.com

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [Jaimin Chokhawala](https://github.com/jaimin1618)
