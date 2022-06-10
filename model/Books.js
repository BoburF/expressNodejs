const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')

class Books {
    constructor(name, year, price, img) {
        this.name = name
        this.year = year
        this.price = price
        this.img = img
    }

    Obj() {
        return {
            name: this.name,
            year: +this.year,
            price: +this.price,
            img: this.img,
            id: uuid()
        }
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'books.json'), 'utf-8', (err, content) => {
                if (err) reject(err)
                else resolve(JSON.parse(content).books)
            })
        })
    }

    async addBook() {
        const books = await Books.getAll()
        const book = this.Obj()

        books.push(book)
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'books.json'), JSON.stringify({ books }), (err) => {
                if (err) reject(err)
                else resolve()
            })
        })
    }

    static async findById(id) {
        const books = await Books.getAll()
        return new Promise((resolve, reject) => {
            const book = books.find(book => book.id === id)

            if (!book) {
                return reject('Book not found')
            }
            resolve(book)

        })
    }

    async updateById(id) {
        const books = await Books.getAll()
        const book = this.Obj()
        let idx = books.findIndex(book => book.id === id)
        books[idx] = book
        return new Promise((resolve, rej) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "books.json"),
                JSON.stringify({ books }),
                (err)=>{
                    if(err) rej(err)
                    else resolve()
                }
                )
        })
    }

    static async deleteById(id){
        const books = await Books.getAll()
        let idx = books.findIndex(book => book.id === id)
        books.splice(idx, 1)
        return new Promise((resolve, rej) => {
            fs.writeFile(
                path.join(__dirname, "..", "data", "books.json"),
                JSON.stringify({ books }),
                (err)=>{
                    if(err) rej(err)
                    else resolve()
                }
                )
        })
    }
}

module.exports = Books