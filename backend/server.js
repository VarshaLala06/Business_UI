const express=require("express")
const mongoose=require("mongoose")
const Transaction = require("./models/Transaction");
const app=express()
const PORT=8080
app.use(express.json())
const cors=require("cors")
app.use(cors())
connectDb()

async function connectDb() {
    try{
        await mongoose.connect("mongodb://localhost:27017/expensetracker")
        console.log("mongodb connected")
    }
    catch(err){
        console.log("connection failed")
    }
}


app.get("/",(req,res)=>{
    res.send("Backend is running")
})

app.post("/add",async (req,res)=>{
    try{
        const transaction= await Transaction.create(req.body)
        res.status(201).send("added succesfully")
    }
    catch(err){
        res.status(500).send(err)
    }

})

app.listen(PORT,()=>{
    console.log("server is runnning")
})