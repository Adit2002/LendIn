const {Schema,model}=require("mongoose");
const investor=new Schema({
    investor_name: String,
    investor_contact_number: String,
    investor_email: String,
    investor_pan: String,
    investor_aadhar: String,
    investor_address :String,
    investor_sex: String
});
module.exports=model("Investor_Details",investor);
