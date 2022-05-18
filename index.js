const express = require("express")
const mongo = require("mongoose")
const app = express()
const routes = require("./appRoutes")
app.use(express.urlencoded({extended:true}))

mongo.connect("mongodb+srv://giacomo:giacomo@esback.d06xh.mongodb.net/?retryWrites=true&w=majority",()=>{

    console.log("collegato con successo al DB") 

    app.use("/home",routes)

    app.listen(3000, ()=>{
        console.log("server in ascolto sulla porta 3000")}) 
})
