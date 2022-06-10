const express = require('express')
const app = express()
const { create } = require('express-handlebars')
const path = require('path')
const exhbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})
app.engine('hbs', exhbs.engine)
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const homeRouter = require('./routes/home')
const booksRouter = require('./routes/books')
const aboutRouter = require('./routes/about')
const cardRouter = require('./routes/card')
const exp = require('constants')


app.use('/', homeRouter)
app.use('/books', booksRouter)
app.use('/about', aboutRouter)
app.use('/card', cardRouter)


try {
    const port = 3000
    app.listen(port, () => {
        console.log('server working on', port);
    })
} catch (error) {

}