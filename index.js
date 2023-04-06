
const express= require("express");  
const dotenv=require("dotenv");
dotenv.config();
const req = require("express/lib/request");
const res = require("express/lib/response");
const userRouter = require("./src/routes/userRotues");
const noteRoutes = require("./src/routes/notesRoutes");
const app=express(); 

const mongoose=require("mongoose");

const corse=require("cors");


app.use(express.json());
app.use(corse());  
app.use("/users",userRouter);
app.use("/note",noteRoutes)

app.get("/",(req,res)=>{
  res.send("Notes API");
});


const PORT=process.env.PORT||6001;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
app.listen(PORT,()=>{
  console.log("Server connected to " +PORT);
});
})
.catch((error)=>{
  console.log (error)
}) 


  

