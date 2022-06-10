const { Router } = require('express')
const router = Router()
const Card = require('../model/Card')
const Books = require('../model/Books')

router.get('/', async (req, res) => {
    const card = await Card.getCard()
  
    res.render('card', {
        card,
        title: 'Shopping card',
    })
})

router.post('/add', async (req, res) => {
    const book = await Books.findById(req.body.id)
    await Card.add(book)
    res.redirect('/books')
})

module.exports = router