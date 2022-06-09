const express = require('express')
const app = express()
const { create } = require('express-handlebars')
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
app.get('/', (req, res) => {
    res.render('index', {
        title: 'home'
    })
})
try {
    const port = 5000
    app.listen(port, () => {
        console.log('server working on', port);
    })
} catch (error) {
    
}