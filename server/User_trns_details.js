const {Schema,model}=require('mongoose');
const User_trns_detail=new Schema({
    email: String,
    on_time: Number,
    late_15_to_30: Number,
    late_30_plus: Number,
    non_repayment: Number
});
module.exports=model("User_trns_detail",User_trns_detail);

// const fun=async()=>{
//     try{
//       await Trns_DetailSchema.create(
//         {
//         email:"xyz@123",
//         on_time: 12,
//         late_15_to_30: 2,
//         late_30_plus: 4,
//         non_repayment: 0
//       });
//     }
//     catch{
//       console.log(err);
//     }
//   }
//   fun();