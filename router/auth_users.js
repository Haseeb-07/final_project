const express = require('express');
const books = require("./booksdb.js");
const isValid = require("./auth_users.js").isValid;
const authenticatedUser = require("./auth_users.js").authenticatedUser;
const users = require("./auth_users.js").users;
const regd_users = express.Router();

// Route for deleting a review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { username } = req.body;
  const isbn = req.params.isbn;

  // Check if the user is authenticated
  if (!authenticatedUser(username)) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Find the book by ISBN
  const book = books[isbn];

  // Check if the book exists
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  // Check if the user has a review for this book
  if (!book.reviews[username]) {
    return res.status(404).json({ message: 'Review not found for the specified user and book' });
  }

  // Delete the user's review for this book
  delete book.reviews[username];

  return res.status(200).json({ message: 'Review deleted successfully', book: book });
});

// ... (other code)

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
