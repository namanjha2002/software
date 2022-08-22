const express = require('express');

const router = express.Router();

const bookcontroller2=require('../controllers/bookController')
//creating data
router.post('/createBook',bookcontroller2.createBook)
router.post('/createAuthor',bookcontroller2.createAuthor)
//second
router.get('/Chetan_books',bookcontroller2.Chetan_books)
// TWO STATES
router.get('/TwoStates',bookcontroller2.TwoStates)
// price b/w 50-100
router.get('/mid',bookcontroller2.mid)