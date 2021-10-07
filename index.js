require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const { uploadFile } = require('./src/middleware/uploadFile')

const port = 5000;
const router = require('./src/routes/');

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

app.post('/test', uploadFile('image'), (req, res) => {
    const data = req.body
    const img = req.file.filename
    res.send({
        data: {
            data, img
        }
    })
})

app.use('/api/v1', router)

app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`)
})