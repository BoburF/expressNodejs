const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', 'data', 'card.json')


class Card{

    static async add(book) {
        const cards = await Card.getCard()
        const idx = cards.card.findIndex(item => item.id === book.id)

        if(idx === -1){
            book.count = 1
            cards.card.push(book)
        }else{
            book.count = cards.card[idx].count + 1
            cards.card[idx] = book
        }

        cards.price = cards.price + +book.price
        cards.count += 1

        return new Promise((res, rej) => {
            fs.writeFile(dir, JSON.stringify(cards), (err) => {
                if (err) rej(err)
                else res()
            })
        })
    }

    static async getCard() {
        return new Promise((res, rej) => {
            fs.readFile(dir, 'utf-8', (err, data) => {
                if (err) rej(err)
                else res(JSON.parse(data))
            })
        })
    }
}

module.exports = Card