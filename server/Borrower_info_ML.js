const {Schema,model}= require('mongoose');
const Borrower_info_ML=new Schema({
    tid: String,
    loan_amt: Number,
    mortdue: Number,
    cur_prop_value: Number,
    year_of_job: Number,
    num_derog_rep: Number,
    num_delinq_cr_lines: Number,
    age_oldest_cr_line: Number,
    num_rec_cr_inq: Number,
    num_cr_inq: Number,
    debt_to_inc: Number
});
module.exports=model('Borrower_info_ML',Borrower_info_ML);