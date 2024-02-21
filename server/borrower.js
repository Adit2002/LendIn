const {Schema,model}=require("mongoose");
const borrower=new Schema({
    borrower_name: String,
    borrower_contact_number: String,
    borrower_email: String,
    borrower_password: String,
    borrower_address: String,
    borrower_aadhar: String,
    borrower_pan: String,
    borrower_sex: String,
    borrower_pan_image: Buffer,
    borrower_aadhar_image: Buffer
});
module.exports=model("Borrower_details",borrower);