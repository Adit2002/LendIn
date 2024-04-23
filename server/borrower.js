const {Schema,model}=require("mongoose");
const borrower=new Schema({
    borrower_name: String,
    borrower_contact_number: String,
    borrower_email: String,
    borrower_address: String,
    borrower_aadhar: String,
    borrower_pan: String,
    borrower_sex: String
});
module.exports=model("Borrower_details",borrower);