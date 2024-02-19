// backend
require("dotenv").config();
const  {urlencoded, json} = require("body-parser");
const mongoose = require("mongoose");
const express=require("express");
const app=express();
const http=require("http");
const cors=require("cors");
const jwt=require("jsonwebtoken");
const Investor = require("./Investor");
const server=http.createServer(app);
mongoose
.connect(process.env.MONGOOSE_API_KEY)
.then((p)=>{
    console.log("DB Connected");
}).catch((err)=>console.log(err));
server.listen(3001,()=>{
    console.log("Server Running on port 3001");
});
app.use(express.urlencoded({extended:true}));
app.use(json());
app.use(
    cors({
        origin:["http://localhost:3000"],
        methods:["GET","POST","PUT","DELETE"],
        credentials: true,
    })
);

const verifyToken = async(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(401).json({message: "Token unavailable"});
    }
    await jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err,decoded)=>{
        if(err){
            return res.status(403).json({message: "Token Invalid"});
        }
        req.user=decoded;
        next();
    })
};


app.post("/Register_Inv",async(req,res)=>{
    console.log("Register as Investor");
    const reg_det=req.body;
    const is_Present=await InvestorSchema.findOne({investor_email: reg_det.email});
    if(is_Present){
        console.log("Email already in use");
        return res.send({is_true:false, message:"Email already in Use, Login for more details"});
    }
    const password_hash=await bcrypt.hash(reg_det.password,10);
    try{
        InvestorSchema.create({
            investor_name: reg_det.name,
            investor_contact_number: reg_det.contact_number,
            investor_email: reg_det.email,
            investor_password: password_hash,
            investor_pan: reg_det.pan,
            investor_aadhar: reg_det.aadhar,
            investor_address :reg_det.address,
            investor_sex: reg_det.sex,
            investor_pan_image: reg_det.pan_image,
            investor_aadhar_image: reg_det.aadhar_image
        });
    }
    catch(err){
        console.log("Error Occured while registration");
        return res.send({is_true:false, message: "Error occured"});
    }
    return res.send({is_true: true, message: "Successfully registered"});
});

app.post("/Register_Borrower",async(req,res)=>{
    console.log("Register as Borrower");
    const reg_det=req.body;
    const is_Present=await BorrowerSchema.findOne({borrower_email: reg_det.email});
    if(is_Present){
        console.log("Email already in use");
        return res.send({is_true:false, message:"Email already in Use, Login for more details"});
    }
    const password_hash=await bcrypt.hash(reg_det.password,10);
    try{
        InvestorSchema.create({
            borrower_name: reg_det.name,
            borrower_contact_number: reg_det.contact_number,
            borrower_email: reg_det.email,
            borrower_password: password_hash,
            borrower_address: reg_det.address,
            borrower_aadhar: reg_det.aadhar,
            borrower_pan: reg_det.pan,
            borrower_sex: reg_det.sex,
            borrower_pan_image: reg_det.pan_image,
            borrower_aadhar_image: reg_det.aadhar_image
        });
    }
    catch(err){
        console.log("Error Occured while registration");
        return res.send({is_true:false, message: "Error occured"});
    }
    return res.send({is_true: true, message: "Successfully registered"});
});

app.post("/Login",async(req,res)=>{
    console.log("Login Page Entered");
    const user=req.body;
    const email=req.email;
    if(user.role==0){
        const user_real=await InvestorSchema.findOne({investor_email: email});
        if(!user_real){
            return res.send({istrue: false, message: "Email is not registered, Register!"});
        }
        const pass_value=await bcrypt.compare(
            user.password,user_real.investor_password
        );
        if(pass_value){
            const token=jwt.sign(user,process.env.JWT_ACCESS_TOKEN,{expiresIn:'2h'});
            console.log("Successful Login");
            return res.send({istrue: true, Jtoken:token, message:"Login Success"});
        }
        else{
            return res.send({istrue: false,messae: "Login Credentials incorrect"});
        }
    }
    if(user.role==1){
        const user_real=await BorrowerSchema.findOne({borrower_email: user.email});
        if(!user_real){
            return res.send({istrue: false,message: "Email is not registered, Register!"});
        }
        const pass_value=await bcrypt.compare(user.password,user_real.borrower_password);
        if(pass_value){
            const token=jwt.sign(user,process.env.JWT_ACCESS_TOKEN,{expiresIn: '2h'});
            console.log("Successful Login");
            return res.send({istrue:true, Jtoken: token, message: "Successfull Login"});
        }
        else{
            return res.send({istrue: false, message: "Login Credentials incorrect"});
        }
    }
});

app.get("/DshbInv",verifyToken,async(req,res)=>{
    const user=InvestorSchema.findOne({investor_email:req.headers.email});
    return res.send({inv_name: user.investor_name });
});

