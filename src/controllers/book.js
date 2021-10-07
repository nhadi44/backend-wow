const { json } = require('body-parser')
const { books } = require('../../models')

exports.getBooks = async (req, res) => {
    try {
        let book = await books.findAll()

        book = JSON.parse(JSON.stringify(book))
        book = book.map(item => {
            return {
                ...item,
                bookFile: process.env.PATH_FILE + item.bookFile
            }
        })

        res.status(200).send({
            status: 'success',
            data: {
                book,
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Server error'
        })
    }
}

// add book
exports.addBook = async (req, res) => {
    try {
        const { title, publicationDate, pages, author, isbn, about, } = req.body

        const createData = await books.create({
            title,
            publicationDate,
            pages,
            author,
            isbn,
            about,
            bookFile: req.file.filename
        })

        res.status(200).send({
            status: 'success',
            data: {
                book: createData,
                bookFile: req.file.filename
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

// findOne Book
exports.getBook = async (req, res) => {
    try {
        const { id } = req.params

        const data = await books.findOne({
            where: {
                id: id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params
        // const updateData = req.body
        const { title, publicationDate, pages, author, isbn, about, } = req.body
        const bookFile = req.file.filename

        await books.update({
            title,
            publicationDate,
            pages,
            author,
            isbn,
            about,
            bookFile
        },
            {
                where: {
                    id: id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

        res.status(200).send({
            status: 'success',
            data: {
                book: {
                    id: id,
                    title,
                    publicationDate,
                    pages,
                    author,
                    isbn,
                    about,
                    bookFile
                }
            }
        })
    } catch (error) {
        console.log(error),
            res.status(400).send({
                status: 'failed',
                message: 'Server Error'
            })
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params

        await books.destroy({
            where: {
                id: id
            }
        })

        res.status(200).send({
            status: 'success',
            message: `Data transaction id: ${id} deleted`
        })
    } catch (error) {
        console.log(error),
            res.status(400).send({
                status: 'failed',
                message: 'Server Error'
            })
    }
}