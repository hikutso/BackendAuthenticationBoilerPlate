const express = require('express')
const app = express()
const bodyParser=require("body-parser")

const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000

var cors = require('cors')


const db=require("./config/keys").mongoURI
//connect to mogodb
mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("mongodb connected")
}).catch(()=>{
    console.log("some error ")
})
mongoose.set('useCreateIndex', true)
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  )
app.use(cors())

app.use('/uploads', express.static('uploads'));
app.use(express.json())

app.use(require("./routes/auth"))
app.use(require("./routes/post"))





app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

