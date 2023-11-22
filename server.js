require("dotenv").config();
const express=require('express')
const mongoose=require("mongoose");
const bookRouter=require("./routes/book");
const userRouter=require("./routes/user");
mongoose.connect(process.env.MONGO_URL).then(()=>{
   console.log("Connected to MongoDB");
});
 
const app=express();
const PORT=process.env.PORT;


const logger=(req,res,next)=>{
    console.log(`Middleware Received ${req.method} on ${req.url}`)
    next();
}
const Secondlogger=(req,res,next)=>{
    console.log(`Second Middleware Received ${req.method} on ${req.url}`)
    next();
}



app.use(express.json())
app.use(logger)

app.use(Secondlogger)
app.use("/api/books",bookRouter);//setting router i.e bookRouter which imports router as middleware between request and response cycle
app.use("/api/users",userRouter);





app.get('',(req,res)=>{
    
    res.send("Hello Guys");
})

app.get("/about ",(req,res)=>{
    console.log({
        url:req.url,
        method:req.method,
        headers:req.headers,
        body:req.body,

    })
    res.send("Hello World")
})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT},`);

})


