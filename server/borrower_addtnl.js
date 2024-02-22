const {Schema,model}=require('mongoose');
const Borrower_additional_info=new Schema({
    email: String,
    annual_income: String,
    year_of_job: Number,
    curr_prop_value: Number
});
module.exports=model('borrower_additional_info',Borrower_additional_info);
