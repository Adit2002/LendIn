const {Schema,model}=require("mongoose");
const active_trns=new Schema({
    trns_id: String,
    trns_lender: String,
    trns_borrower: String,
    trns_status: String,
    trns_date: String,
    trns_expiry_date:String
});
model.exports=model("active_trns",active_trns);