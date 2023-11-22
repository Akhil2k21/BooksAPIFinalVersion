const express=require("express");
const jwt=require("jsonwebtoken");
const router=express.Router();
const Book=require("../models/bookdb");
const jwtVerify=(req,res,next)=>{
   console.log(req.headers);
   const authToken=req.headers.authorization;//The JWT Token sent by the client 
   const decodedToken=jwt.verify(authToken,process.env.JWT_SECRET);//JWT is verifying whether Client generated token in request and secret key generated by server or same or not
   console.log({decodedToken});
   next(); 
}
router.use(jwtVerify);
 //Fetching all books data from server
 router.get("/",async(req,res)=>{
    const books=await Book.find();
    res.send(books);
 });
 //To Fetch the data of one book from server
 router.get("/:id",async(req,res)=>{
     const id=req.params.id;
     const book=await Book.findById(id);
     res.send(book);
 })
 //create API call
 router.post("",async(req,res)=>{
     const book=req.body;
     console.log(book);
     const dbBook=await Book.create(book);
     res.send(dbBook);
 })
 //delete API call
 router.delete("/:id",async(req,res)=>{
   const id=req.params.id;
   const book=req.body;
   const dbBook=await Book.deleteOne(book);
   res.send(dbBook);
   console.log(dbBook);
 });
 //Update A.P.I call
 router.put("/:id",async(req,res)=>{
 const {id:taskID}=req.params;
 const book=req.body;
 const dbBook=await Book.findOneAndUpdate({_id:taskID},book,{
    new:true,
    runValidators:true,
 })   
 res.send(dbBook);

 })
 
module.exports=router;