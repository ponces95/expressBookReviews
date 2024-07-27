const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password} = req.body;
  if (!username || password) {
    return res.status(400).json({message: 'Provide username and password'});
  }
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(409).json({message: 'User already exists'});
  }
  users.push({username, password});
  return res.status(200).json({message: "User registered"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let booksList = Object.values(books)
  let book= booksList.find (b=>b.title === title);
  if (book){
    let bookDetails = JSON.stringfy(book);
    res.send(`${title} details : ${bookDetails}`);
  }else{
    res.send ( `${title} not found`);}
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let booksList = Object.values(books)
  let book = booksList.find(b => b.isbn===isbn);
  if (book){
    const reviews = book.reviews;
    res.send(reviews);
  }else{
    res.send('Book not found');}
});

module.exports.general = public_users;
