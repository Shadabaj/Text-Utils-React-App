# Text Utilities & Employee Portal

A React application that combines text-analysis utilities with login, employee-management, and role-based user/admin screens backed by an ASP.NET Core API.

## Features

### Text utilities
- Convert entered text to uppercase or lowercase.
- Clear text and display action feedback.
- Switch between light and dark presentation modes.
- Navigate to an About page.

### Employee portal
- Login flow that calls a backend API.
- Employee create/list and administrative UI modules.
- Separate user and administrator route modules loaded lazily.
- Axios request interceptor that adds the stored bearer token when present.
- Session-based client state for the signed-in user.

Some workflows depend on the companion backend being available. Client-side role checks and route guards are not a substitute for server-side authorization.

## Technology stack

- React and JavaScript
- React Router
- Axios
- Formik and Yup
- Create React App / `react-scripts`
- React Testing Library and Jest

## Local setup

### Prerequisites

- Node.js and npm
- A running instance of the companion ASP.NET Core API for employee/login workflows

### Configure the API base URL

Copy `.env.example` to `.env.local` and set `REACT_APP_API_BASE_URL` to the API base URL for your local environment. The default fallback is `https://localhost:7023/api`.

React environment variables are embedded into the client bundle; never store server secrets or private API keys in them.

### Install and start

~~~bash
npm ci
npm start
~~~

Open `http://localhost:3000/`.

## Build and test

~~~bash
npm test
npm run build
~~~

## Project structure

~~~text
src/
├── api/                  # Shared Axios client and interceptors
├── components/
│   ├── Admin/             # Administrator routes and screens
│   ├── User/              # User routes and screens
│   ├── Textform.js        # Text conversion utilities
│   ├── Login.js           # Login interface
│   ├── CreateEmployee.js  # Employee creation screen
│   └── EmployeeList.js    # Employee listing
├── App.js
└── index.js
~~~

## Security and maintenance

- Keep authentication and authorization decisions on the server.
- Avoid treating browser storage as a secure vault for sensitive data.
- Review logout/session-expiry behavior when changing authentication.
- Configure the API URL via environment-specific settings rather than hard-coding deployment endpoints.
- Run the test and production build commands before deployment.

## License

No license file is currently included. Add an explicit license before inviting others to reuse or redistribute this project.
