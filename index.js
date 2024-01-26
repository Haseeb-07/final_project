const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Session middleware for customer routes
app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

// Authentication middleware for customer routes
app.use("/customer/auth/*", function auth(req, res, next) {
  // Implement your authentication mechanism here
  // For example, you can check if the user is logged in using session or JWT
  // If authentication fails, you can respond with a 401 Unauthorized status
  // Otherwise, call next() to proceed to the next middleware or route handler
  next();
});

// Apply customer routes
app.use("/customer", customer_routes);

// Apply general routes
app.use("/", genl_routes);

const PORT = 5000;

app.listen(PORT, () => console.log("Server is running"));
