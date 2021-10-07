const { transactions, users } = require('../../models')


// Add transaction
exports.addTransaction = async (req, res) => {
    try {
        const remainingActive = "30"
        const userStatus = "Active"
        const paymentStatus = "Approve"

        const id = req.users.id

        const createData = await transactions.create({
            transferProof: req.file.filename,
            remainingActive,
            userStatus,
            paymentStatus,
            idUser: req.users.id
        })

        const transaction = await transactions.findOne({
            include: {
                model: users,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password', 'role']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where: {
                idUser: req.users.id
            }
        })

        res.status(200).send({
            status: "success",
            data: {
                transactions: transaction
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: "failed",
            message: "Server Error"
        })
    }
}


exports.getTransactions = async (req, res) => {
    try {
        const data = await transactions.findAll({
            include: {
                model: users,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password', 'role']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser']
            }
        })

        res.status(200).send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error),
            res.status(400).send({
                status: 'failed',
                message: 'Server Error'
            })
    }
}

// Get One Transaction
exports.getTransaction = async (req, res) => {
    try {
        const { id } = req.params
        // const paymentStatus = req.body

        const transaction = await transactions.findOne({
            where: {
                id: id
            },
            include: {
                model: users,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'role', 'password', 'email']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).send({
            status: 'success',
            data: {
                transaction: transaction
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 'failed',
            message: 'Server error'
        })
    }
}

// Update Transaction
exports.updateTaransaction = async (req, res) => {
    try {
        const { id } = req.params

        const paymentStatus = req.body

        await transactions.update(paymentStatus, {
            where: {
                id: id
            }
        })

        const transaction = await transactions.findOne({
            where: {
                id: id
            },
            include: {
                model: users,
                as: 'users',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'role', 'email', 'password']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.status(200).send({
            status: 'success',
            data: {
                transaction: transaction
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