const express = require('express')

const router = express.Router()
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/users')
const { register, login } = require('../controllers/auth')
const { addBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/book')
const { addTransaction, getTransactions, getTransaction, updateTaransaction } = require('../controllers/transaction')

const { auth } = require('../middleware/auth')
const { uploadFile } = require('../middleware/uploadFile')

router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.post('/register', register)
router.post('/login', login)

// Books
router.post('/book', auth, uploadFile('bookFile'), addBook)
router.get('/books', getBooks)
router.get('/book/:id', getBook)
router.patch('/book/:id', uploadFile('bookFile'), updateBook)
router.delete('/book/:id', deleteBook)

// Transaction
router.post('/transaction', auth, uploadFile('transferProof'), addTransaction)
router.get('/tansactions', getTransactions)
router.get('/tansaction/:id', getTransaction)
router.patch('/tansaction/:id', auth, updateTaransaction)

module.exports = router