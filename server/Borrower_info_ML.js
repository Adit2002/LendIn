const {Schema,model}= require('mongoose');
const Borrower_info_ML=new Schema({
    tid: String,
    annual_inc: Number,
    dti: Number, 
    inq_last_6mths: Number, 
    open_acc: Number, 
    total_acc: Number, 
    revol_util: Number, 
    total_pymnt: Number, 
    grade_encoded: Number, 
    loan_amnt: Number, 
    term_months: Number,
    emp_length_years: Number,
    installment: Number
});
module.exports=model('Borrower_info_ML',Borrower_info_ML);