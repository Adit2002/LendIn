const {Schema,model}=require("mongoose");
const loan_type=new Schema({
    loan_type: String,
    loan_intrest: Number
});
module.exports=model('Loan_Type',loan_type);
