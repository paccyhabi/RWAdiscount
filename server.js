const express = require('express')
const cors = require('cors')
const path = require('path');
const cookieParser = require("cookie-parser");
const app = express()



//midleware
app.use(cookieParser());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
//routers
const userRoutes = require('./routes/usersRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const categoryRoutes = require('./routes/adminRoutes.js')
const userProductRoutes = require('./routes/userProducts.js')
app.use('/', userRoutes)
app.use('/',productRoutes)
app.use('/',categoryRoutes)
app.use('/',userProductRoutes)

//testing api
app.get('/', (req, res) => {
    res.json({message:'hello from api'})
})


//port
const PORT = process.env.PORT || 8080


//server
app.listen(PORT, ()=> {
    console.log('server is running on port: ', PORT)
})