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
const bcrypt=require('bcrypt');
const server=http.createServer(app);
const BorrowerSchema=require('./borrower.js');
const InvestorSchema=require('./Investor.js');
const { spawn } = require('child_process');
const TicketSchema=require('./Ticket.js');
const Loan_typeSchema=require('./Loan_type.js');
const AdtnlSchema=require("./borrower_addtnl.js");
const BorrowerMLSchema=require("./Borrower_info_ML.js");
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
const verifyToken = (req, res, next) => {
    // Extract token from the Authorization header
    const token = req.headers.authorization;
    // console.log(token);

    // Check if token is available
    if (!token) {
        console.log("Unauthorized Access: Token unavailable");
        return res.status(401).json({ message: "Token unavailable" });
    }
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
        if (err) {
            console.log("Forbidden: Token invalid");
            return res.status(403).json({ message: "Token Invalid" });
        }
        req.user = decoded;
        console.log("Token Verified");
        next();
    });
};


app.post("/Register_Inv",async(req,res)=>{
    console.log("Register as Investor");
    const reg_det=req.body;
    const is_Present=await InvestorSchema.findOne({investor_email: reg_det.email});
    if(is_Present){
        console.log("Email already in use");
        return res.send({is_true:false, message:"Email already in Use, Login for more details"});
    }
    console.log(reg_det);
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
        console.log("Successfull");
    }
    catch(err){
        console.log(err);
        console.log("Error Occured while registration");
        return res.send({is_true:false, message: "Error occured"});
    }
    return res.send({is_true: true, message: "Successfully registered"});
});

app.post("/Register_Borrower", async (req, res) => {
    console.log("Register as Borrower");
    const reg_det = req.body;
    // console.log(req.body);
    try {
        // Check if the email is already in use
        const isPresent = await BorrowerSchema.findOne({ borrower_email: reg_det.email });
        if (isPresent) {
            console.log("Email already in use");
            return res.send({ is_true: false, message: "Email already in Use, Login for more details" });
        }

        // Hash the password
        const password_hash = await bcrypt.hash(reg_det.password, 10);

        // Create a new borrower document
        await BorrowerSchema.create({
            borrower_name: reg_det.name,
            borrower_contact_number: reg_det.contact_number,
            borrower_email: reg_det.email,
            borrower_password: password_hash,
            borrower_address: reg_det.address,
            borrower_aadhar: reg_det.aadhar,
            borrower_pan: reg_det.pan,
            borrower_sex: reg_det.sex,
            // borrower_pan_image: reg_det.pan_image,
            // borrower_aadhar_image: reg_det.aadhar_image
        });

        // Send success response
        console.log("Success");
        return res.send({ is_true: true, message: "Successfully registered" });
    } catch (err) {
        console.log("Error occurred while registration:", err);
        return res.status(500).send({ is_true: false, message: "Error occurred" });
    }
});

app.post("/Login",async(req,res)=>{
    console.log("Login Page Entered");
    const user=req.body;
    const email=req.body.email;
    console.log(email);
    if(user.role===0){
        console.log('idhar');
        const user_real=await InvestorSchema.findOne({investor_email: email});
        if(!user_real){
            return res.send({istrue: false, message: "Email is not registered, Register!"});
        }
        const pass_value=await bcrypt.compare(
            user.password,user_real.investor_password
        );
        if(pass_value){
            // console.log(process.env.JWT_ACCESS_KEY);
            const token=jwt.sign(user,process.env.JWT_ACCESS_KEY,{expiresIn:'2h'});
            console.log("Successful Login");
            return res.send({istrue: true, Jtoken:token, message:"Login Success"});
        }
        else{
            return res.send({istrue: false,messae: "Login Credentials incorrect"});
        }
    }
    if(user.role==1){
        const user_real=await BorrowerSchema.findOne({borrower_email: email});
        if(!user_real){
            return res.send({istrue: false,message: "Email is not registered, Register!"});
        }
        const pass_value=await bcrypt.compare(user.password,user_real.borrower_password);
        if(pass_value){
            const token=jwt.sign(user,process.env.JWT_ACCESS_KEY,{expiresIn: '2h'});
            console.log("Successful Login");
            return res.send({istrue:true, Jtoken: token, message: "Successfull Login"});
        }
        else{
            return res.send({istrue: false, message: "Login Credentials incorrect"});
        }
    }
});
app.get("/checktoken",verifyToken,async(req,res)=>{
    return res.send({is_true: true});
})
app.get("/DshbInv",async(req,res)=>{
    const user=InvestorSchema.findOne({investor_email:req.headers.email});
    return res.send({inv_name: user.investor_name });
});

app.get("/DshbBrw",async(req,res)=>{
    const user=InvestorSchema.findOne({borrower_email: req.headers.email});
    return res.send({brw_name: user.borrower_name});
});
const create_loan_type=async()=>{
    await Loan_typeSchema.create({
        loan_type: "Education",
        loan_intrest: 7
    });
    await Loan_typeSchema.create({
        loan_type: "Home",
        loan_intrest: 8
    });
    await Loan_typeSchema.create({
        loan_type: "Car",
        loan_intrest: 8
    });
    await Loan_typeSchema.create({
        loan_type: "Personal",
        loan_intrest: 9
    });
}
create_loan_type();
const Update_Score = async (tid) => {
    try {
        const tdet = await TicketSchema.findOne({ Ticket_id: tid });
        const Adtnl = await AdtnlSchema.findOne({ email: tdet.borrower_mail });
        const brw_ml = await BorrowerMLSchema.findOne({ tid: tid });
        console.log('here');
        console.log(Adtnl);
        console.log(tdet);
        if (brw_ml) {
            await BorrowerMLSchema.updateOne(
                { tid: tid },
                {
                    $set: {
                        loan_amt: tdet.loan_amount,
                    }
                });
        }
        else {
            await BorrowerMLSchema.create({
                tid: tid,
                annual_inc: ,
                dti: , 
                inq_last_6mths: 0, 
                open_acc: 0, 
                total_acc: 0, 
                revol_util: 0, 
                total_pymnt: 0, 
                grade_encoded: , 
                loan_amnt: , 
                term_months: ,
                emp_length_years: ,
                installment:   
            });
        }
        console.log("Created/Updated_Ml_Data");
        Create_Score(tid);
    } catch (err) {
        console.log(err);
    }
}
const Create_Score = async (tid) => {
    try {
        const ml_data = await BorrowerMLSchema.findOne({ tid: tid });

        if (!ml_data) {
            console.log("No ML data found for tid:", tid);
            return;
        }

        console.log(ml_data);
        console.log('Create Ticket Entered');
        const pythonProcess = spawn('python', [
            './gen_model/model.py',
            '--disable=warning',
            ml_data.annual_inc,
            ml_data.dti, 
            ml_data.inq_last_6mths, 
            ml_data.open_acc, 
            ml_data.total_acc, 
            ml_data.revol_util, 
            ml_data.total_pymnt, 
            ml_data.grade_encoded, 
            ml_data.loan_amnt, 
            ml_data.term_months,
            ml_data.emp_length_years,
            ml_data.installment 
        ]);

        pythonProcess.stdout.on('data', async (data) => {
            console.log(`${data}`);
            await TicketSchema.updateOne({ Ticket_id: tid }, { $set: { TicketScore: `${data[0]}` } });
        });

        pythonProcess.stderr.on('data', (data) => {
            console.log(`${data}`);
            // Handle stderr data if needed
        });

        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
        });
    } catch (err) {
        console.log(err);
    }
    // console.log(ticdet);
}

app.post('/Checking_for_data',async(req,res)=>{
    const id=AdtnlSchema.findOne({email: req.body.email});
    if(id){
        return res.send({is_true: true});
    }
    return res.send({is_true: false});
});
app.post("/CreateTicket",async(req,res)=>{

    // console.log(req.body);
    function create_instlmnt(loan_amount, loan_duration, loan_interest) {
        let monthly_interest_rate = loan_interest / 12 / 100;
        let installment = (loan_amount * monthly_interest_rate) / (1 - Math.pow(1 + monthly_interest_rate, -loan_duration));
        return installment;
    }
    const ticket=req.body;
    const intrest=await Loan_typeSchema.findOne({loan_type: ticket.type});
    let instlmnt=create_instlmnt(ticket.amount,ticket.duration,intrest.loan_intrest);
    try{
        await TicketSchema.create({
            Ticket_id: ticket.id,
            borrower_mail: ticket.mail,
            loan_amount: ticket.amount,
            loan_duration: ticket.duration,
            loan_type: ticket.type,
            loan_intrest: intrest.loan_intrest,
            loan_installment: instlmnt,
            Description: ticket.Description,
            views: ticket.views,
            Date_created: ticket.Date
        });
        Update_Score(ticket.id);
        console.log('Ticket Created');
    }
    catch(err){
        console.log(err);
        return res.send({is_true:false,message:err});
    }
    return res.send({is_true: true});
});

app.get('/SeeTicket',async(req,res)=>{
    try{
        const get_all_data=await TicketSchema.find({});
        return res.send({is_true: true, message: "Got all Data",JsonData: get_all_data});
    }
    catch(err){
        console.log(err);
        return res.send({is_true:false,message: "Error"});
    }
});
app.get('/Open_Ticket',async(req,res)=>{
    try{
        const ticketDetails=await TicketSchema.findOne({id:req.body.tid});
        const user_detail=await BorrowerSchema.findOne({email: ticketDetails.borrower_mail});
        return res.send({is_true: true,JsonData_ticket:ticketDetails,JsonData_user: user_detail});
    }catch(err){
        console.log(err);
        return res.send({is_true:false});
    }
});
app.post('/brw_adtnl_info',async(req,res)=>{
    const detail=req.body;
    console.log(detail);
    try{
        const already=await AdtnlSchema.findOne({email:detail.email});
        if(already){
            await AdtnlSchema.updateOne({email: detail.email},{
                $set:{
                annual_income: detail.income,
                year_of_job: detail.yoj,
                curr_prop_value:detail.val_cur_prop
            }
        });
        }
        else{
            await AdtnlSchema.create({
                email: detail.email,
                annual_income: detail.income,
                year_of_job: detail.yoj,
                curr_prop_value: detail.val_cur_prop
            });
        }

        console.log('Update/Creation Successfull');
        return res.send({is_true: true});
    }
    catch(err){
        console.log(err);
    }
    return res.send({is_true:false});
});
