const express = require('express');
const books = require("./booksdb.js");
const public_users = express.Router();

// Route to get books by a specific review score
public_users.get('/books/review/:score', function (req, res) {
  const targetScore = parseInt(req.params.score);

  // Filter books by review score
  const booksWithReview = Object.entries(books)
    .filter(([_, book]) => {
      const reviews = Object.values(book.reviews);
      const averageScore = reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length;
      return averageScore === targetScore;
    })
    .reduce((result, [id, book]) => {
      result[id] = book;
      return result;
    }, {});

  return res.status(200).json({ books: booksWithReview });
});

module.exports.general = public_users;
