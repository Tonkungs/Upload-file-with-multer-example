const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var multer = require('multer')
// setting
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+file.originalname)
    }
})

var upload = multer({ storage: storage })

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => res.send('Hello World!'))
app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // console.log(req.body);
    res.json(req.file)
})

app.listen(3001, () => console.log('Example app listening on port 3001!'))