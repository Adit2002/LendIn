const {Schema,model}=require("mongoose");
const investor=new Schema({
    investor_name: String,
    investor_contact_number: String,
    investor_email: String,
    investor_password: String,
    investor_pan: String,
    investor_aadhar: String,
    investor_address :String,
    investor_sex: String,
    investor_pan_image: String,
    investor_aadhar_image: String
});
module.exports=model("Investor_Details",investor);
