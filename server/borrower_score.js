import { Schema,model } from "mongoose";
const borrower_score=new Schema({
    borrower_email: String,
    past_loan: [String],
    loan_default: [String],
    current_score: Number,
});
module.exports=model("borrower_score",borrower_score);