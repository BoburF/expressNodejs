const express = require('express')
const router = express.Router()
const Books = require('../model/Books')

router.get('/', async (req, res) => {
    const books = await Books.getAll()

    res.render('books', {
        title: 'Books',
        books
    })
})

router.get('/add', async (req, res) => {
    res.render('formAdd', {
        title: 'Form Add Book'
    })
})

router.post('/add', async (req, res) => {
    const books = new Books(req.body.name, req.body.year, req.body.price, req.body.img)
    await books.addBook()
    res.redirect('/books')
})

router.get('/edit/:id', (req, res) => {
    Books.findById(req.params.id).then(book => {
        res.render('book', {
            book,
            title: book.name
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).redirect('/404')
    })
})

router.get('/update/:id/add', (req, res) => {
    Books.findById(req.params.id).then(book => {
        res.render('formUpdate', {
            book,
            title: book.name
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).redirect('/404')
    })
})

router.post('/update/:id/add', (req, res) => {
    const books = new Books(req.body.name, req.body.year, req.body.price, req.body.img)
    books.updateById(req.params.id)

    res.redirect('/books')
})

router.get('/delete/:id', (req, res) => {
    Books.deleteById(req.params.id)
    res.redirect('/books')
})



module.exports = router