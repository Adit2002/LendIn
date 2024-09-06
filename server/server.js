// backend
require("dotenv").config();
const { urlencoded, json } = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
const Investor = require("./Investor");
const RazorPay = require("razorpay");
const server = http.createServer(app);
const BorrowerSchema = require("./borrower.js");
const InvestorSchema = require("./Investor.js");
const MetaMask= require('./MetaMask.js');
const { spawn } = require("child_process");
const TicketSchema = require("./Ticket.js");
const Loan_typeSchema = require("./Loan_type.js");
const AdtnlSchema = require("./borrower_addtnl.js");
const BorrowerMLSchema = require("./Borrower_info_ML.js");
const Trns_DetailSchema = require("./User_trns_details.js");
mongoose
  .connect(process.env.MONGOOSE_API_KEY)
  .then((p) => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));
server.listen(3001, () => {
  console.log("Server Running on port 3001");
});
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",  
      "https://lend-in.vercel.app",  
      "https://lend-8g9ih55s7-adit2002s-projects.vercel.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
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

app.post("/Register_Inv", async (req, res) => {
  console.log("Register as Investor");
  const reg_det = req.body;
  try {
    InvestorSchema.create({
      investor_name: reg_det.name,
      investor_contact_number: reg_det.contact_number,
      investor_email: reg_det.email,
      investor_pan: reg_det.pan,
      investor_aadhar: reg_det.aadhar,
      investor_address: reg_det.address,
      investor_sex: reg_det.sex,
    });
    console.log("Successfull");
    return res.send({ is_true: true, message: "Successfully registered" });
  } catch (err) {
    console.log(err);
  }
  return res.send({ is_true: false, message: "Error occured" });
});

app.post("/Register_Borrower", async (req, res) => {
  console.log("Register as Borrower");
  const reg_det = req.body;
  try {
    await BorrowerSchema.create({
      borrower_name: reg_det.name,
      borrower_contact_number: reg_det.contact_number,
      borrower_email: reg_det.email,
      borrower_address: reg_det.address,
      borrower_aadhar: reg_det.aadhar,
      borrower_pan: reg_det.pan,
      borrower_sex: reg_det.sex,
    });
    console.log("Success");
    return res.send({ is_true: true, message: "Successfully registered" });
  } catch (err) {
    console.log("Error occurred while registration:", err);
  }
  return res.status(500).send({ is_true: false, message: "Error occurred" });
});

app.post("/Reg", async (req, res) => {
  const role = req.body.role;
  const gt = req.body.token.credential;
  const googletoken = jwtDecode(gt);
  try {
    const tokenPayload = {
      email: googletoken.email,
      role: role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "2h",
    });

    let isPresent = null;
    let is_Present1 = null;

    if (role === 1) {
      isPresent = await BorrowerSchema.findOne({
        borrower_email: googletoken.email,
      }).catch((err) => {
        throw err;
      });
    } else {
      is_Present1 = await InvestorSchema.findOne({
        investor_email: googletoken.email,
      }).catch((err) => {
        throw err;
      });
    }

    if (isPresent !== null || is_Present1 !== null) {
      return res.send({
        istrue: true,
        isPresent: true,
        Jtoken: token,
        Name: googletoken.name,
        email: googletoken.email,
        message: "Login successful.",
      });
    }

    return res.send({
      istrue: true,
      isPresent: false,
      Jtoken: token,
      Name: googletoken.name,
      email: googletoken.email,
      message: "Registration successful.",
    });
  } catch (err) {
    console.error("Error occurred during registration:", err);
    return res.status(500).send({
      istrue: false,
      message: "An error occurred during registration.",
    });
  }
});

app.get("/",(req,res)=>{
  const data=BorrowerSchema.find({});
  return res.status(200).send(data);
});
app.post("/Login", async (req, res) => {
  const gt = req.body.token.credential;
  const googletoken = jwtDecode(gt);
  const role = req.body.role;

  try {
    let user_real;
    let userType;

    if (role === 0) {
      user_real = await InvestorSchema.findOne({
        investor_email: googletoken.email,
      });
      userType = "Investor";
    } else if (role === 1) {
      user_real = await BorrowerSchema.findOne({
        borrower_email: googletoken.email,
      });
      userType = "Borrower";
    } else {
      return res.status(400).send({ message: "Invalid role specified." });
    }

    const tokenPayload = {
      email: googletoken.email,
      role: userType,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "2h",
    });
    let isp = true;
    if (!user_real) isp = false;
    return res.send({
      istrue: true,
      Jtoken: token,
      Name: googletoken.name,
      email: googletoken.email,
      ispresent: isp,
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Error occurred during login:", error);
    return res.status(500).send({ message: "An error occurred during login." });
  }
});
app.post('/maskconnect',async(req,res)=>{
  const user = req.body;
  const role = user.role;
  const email = user.email;
  const id=user.accid;
  try {
    await MetaMask.create({
      email: email,
      role: role,
      acid:id
    });
    console.log("Success")
    return res.send({ istrue: true, message: "Successfully registered" });
  } catch (err) {
    console.log("Error occurred while registration:", err);
  }
  console.log("NoSuccess")
  return res.send({istrue: false, message: "Error, Try Again"});
});
app.post('/getmmid',async(req,res)=>{
  const emails=req.body.emails;
  const tid=req.body.tid;
  try{
    const sender=await MetaMask.findOne({email: emails});
    const ticket=await TicketSchema.findOne({Ticket_id: tid});
    const rec=await MetaMask.findOne({email: ticket.borrower_mail});
    return res.send({istrue: true, sender: sender, ticket: ticket, reciver: rec});
  }catch(err){
    console.log(err);
    return res.send({istrue: false,message: "Error, try Again"});
  }
})
app.get("/checktoken", verifyToken, async (req, res) => {
  return res.send({ is_true: true });
});
app.get("/DshbInv", async (req, res) => {
  const user = InvestorSchema.findOne({ investor_email: req.headers.email });
  return res.send({ inv_name: user.investor_name });
});

app.get("/DshbBrw", async (req, res) => {
  const user = InvestorSchema.findOne({ borrower_email: req.headers.email });
  return res.send({ brw_name: user.borrower_name });
});
const create_loan_type = async () => {
  await Loan_typeSchema.create({
    loan_type: "Education",
    loan_intrest: 7,
  });
  await Loan_typeSchema.create({
    loan_type: "Home",
    loan_intrest: 8,
  });
  await Loan_typeSchema.create({
    loan_type: "Car",
    loan_intrest: 8,
  });
  await Loan_typeSchema.create({
    loan_type: "Personal",
    loan_intrest: 9,
  });
};
create_loan_type();
const Update_Score = async (tid) => {
  try {
    const tdet = await TicketSchema.findOne({ Ticket_id: tid });
    const Adtnl = await AdtnlSchema.findOne({ email: tdet.borrower_mail });
    const brw_ml = await BorrowerMLSchema.findOne({ tid: tid });
    // console.log("here");
    // console.log(Adtnl);
    // console.log(tdet);
    if (brw_ml) {
      await BorrowerMLSchema.updateOne(
        { tid: tid },
        {
          $set: {
            loan_amt: tdet.loan_amount,
          },
        }
      );
    } else {
      await BorrowerMLSchema.create({
        tid: tid,
        annual_inc: Adtnl.annual_income / 80,
        dti: 0,
        inq_last_6mths: 0,
        open_acc: 0,
        total_acc: 0,
        revol_util: 0,
        total_pymnt: 0,
        grade_encoded: 2,
        loan_amnt: tdet.loan_amount / 80,
        term_months: tdet.loan_duration,
        emp_length_years: Adtnl.year_of_job,
        installment: tdet.loan_installment / 80,
      });
    }
    // console.log("Created/Updated_Ml_Data");
    Create_Score(tid);
  } catch (err) {
    console.log(err);
  }
};
const Create_Score = async (tid) => {
  try {
    const ml_data = await BorrowerMLSchema.findOne({ tid: tid });

    if (!ml_data) {
      //   console.log("No ML data found for tid:", tid);
      return;
    }

    // console.log(ml_data);
    // console.log("Create Ticket Entered");
    const pythonProcess = spawn("python", [
      "./gen_model/model.py",
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
      ml_data.installment,
    ]);

    pythonProcess.stdout.on("data", async (data) => {
      const score = data.toString().trim(); // Convert buffer to string and remove leading/trailing whitespaces

      let scoreText = "";
      switch (score) {
        case "0":
        case "3":
          scoreText = "0-10%";
          break;
        case "1":
          scoreText = "80-100%";
          break;
        case "2":
          scoreText = "0-5%";
          break;
        case "4":
          scoreText = "70-90%";
          break;
        case "5":
          scoreText = "90-100%";
          break;
        case "6":
          scoreText = "60-80%";
          break;
        case "7":
          scoreText = "70-90%";
          break;
        case "8":
          scoreText = "50-75%";
          break;
        case "9":
          scoreText = "40-70%";
          break;
        default:
          console.log("Invalid score:", score);
      }

      await TicketSchema.updateOne(
        { Ticket_id: tid },
        { $set: { TicketScore: scoreText } }
      );
    });

    pythonProcess.stderr.on("data", (data) => {
      //   console.log(`${data}`);
      // Handle stderr data if needed
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
    });
  } catch (err) {
    console.log(err);
  }
  // console.log(ticdet);
};

app.post("/Checking_for_data", async (req, res) => {
  const id = AdtnlSchema.findOne({ email: req.body.email });
  if (id) {
    return res.send({ is_true: true });
  }
  return res.send({ is_true: false });
});
app.post("/CreateTicket", async (req, res) => {
  // console.log(req.body);
  function create_instlmnt(loan_amount, loan_duration, loan_interest) {
    let monthly_interest_rate = loan_interest / 12 / 100;
    let installment =
      (loan_amount * monthly_interest_rate) /
      (1 - Math.pow(1 + monthly_interest_rate, -loan_duration));
    return installment;
  }
  const ticket = req.body;
  const intrest = await Loan_typeSchema.findOne({ loan_type: ticket.type });
  let instlmnt = create_instlmnt(
    ticket.amount,
    ticket.duration,
    intrest.loan_intrest
  );
  try {
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
      Date_created: ticket.Date,
    });
    Update_Score(ticket.id);
  } catch (err) {
    console.log(err);
    return res.send({ is_true: false, message: err });
  }
  return res.send({ is_true: true });
});

app.get("/SeeTicket", async (req, res) => {
  try {
    const get_all_data = await TicketSchema.find({});
    return res.send({
      is_true: true,
      message: "Got all Data",
      JsonData: get_all_data,
    });
  } catch (err) {
    console.log(err);
    return res.send({ is_true: false, message: "Error" });
  }
});

app.post("/Open_Ticket", async (req, res) => {
  // console.log(req);
  try {
    const ticketDetails = await TicketSchema.findOne({
      Ticket_id: req.body.tid,
    });
    // console.log(ticketDetails);
    const TD = await TicketSchema.find({
      borrower_mail: ticketDetails.borrower_mail,
    });
    const user_detail = await BorrowerSchema.findOne({
      borrower_email: ticketDetails.borrower_mail,
    });
    const borrower_ml = await BorrowerMLSchema.findOne({
      tid: req.body.tid,
    });
    const Trns_Data = await Trns_DetailSchema.findOne({
      email: ticketDetails.borrower_mail,
    });
    // console.log("Suvvess");
    return res.send({
      is_true: true,
      JsonData_ticket: ticketDetails,
      JsonData_ticketAll: TD,
      JsonData_user: user_detail,
      JsonData_ML: borrower_ml,
      JsonTrns_Data: Trns_Data,
    });
  } catch (err) {
    console.log(err);
    return res.send({ is_true: false });
  }
});


app.post("/brw_adtnl_info", async (req, res) => {
  const detail = req.body;
  try {
    const already = await AdtnlSchema.findOne({ email: detail.email });
    if (already) {
      await AdtnlSchema.updateOne(
        { email: detail.email },
        {
          $set: {
            annual_income: detail.income,
            year_of_job: detail.yoj,
            curr_prop_value: detail.val_cur_prop,
          },
        }
      );
    } else {
      await AdtnlSchema.create({
        email: detail.email,
        annual_income: detail.income,
        year_of_job: detail.yoj,
        curr_prop_value: detail.val_cur_prop,
      });
    }

    // console.log("Update/Creation Successfull");
    return res.send({ is_true: true });
  } catch (err) {
    console.log(err);
  }
  return res.send({ is_true: false });
});
