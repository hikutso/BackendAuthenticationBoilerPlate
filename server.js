const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000



const db=require("./config/keys").mongoURI
//connect to mogodb
mongoose.connect(db,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("mongodb connected")
}).catch(()=>{
    console.log("some error ")
})
mongoose.set('useCreateIndex', true)

app.use(express.json())

app.use(require("./routes/auth"))





app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

