const express = require('express')
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')

dotenv.config()
const app = express();
app.use(cors({
    credentials: true,
    origin:"http://localhost:19006",
    methods: "GET,POST,PUT,DELETE",
    optionsSuccessStatus: 200
}))
app.use(express.json({limit: '14kb'}))
app.use(bodyparser.urlencoded({extended: true}));
app.use(cookieParser());


const VendorRoute = require('./routes/vendorLogin.js');
app.use("/upload", express.static("./upload"))
app.use('/api/v1/vendorData', VendorRoute);

 app.listen(process.env.PORT,(req,res) => {
    console.log(`Server is working on ${process.env.PORT}`);
})

// Unhandled Promise Rejection
