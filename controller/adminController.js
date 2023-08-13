const requestModel = require('../model/requestModel');
const userModel = require('../model/userModel');
const withdrawrequest = require('../model/withdrawModel')

exports.deposit_accept = async (req, res, next) => {
 let request = await requestModel.findById(req.body.objectId)
 if(!request){
    res.status(400).json({
        status:"Faild",
        message:"Request Not Found"
     })
 }else{
     let user = await userModel.findById(request.user_id)
     if(!user){
        res.status(400).json({
            status:"Failed",
            message:"User not Found"
         })
     }else{
        user.amount += request.amount;
        await user.save();
        const deletedObject  = await requestModel.deleteOne({ _id: req.body.objectId })
        res.status(200).json({
            status:"Success",
            data : user.amount
         })
     }
 }
 
};

exports.withdraw_accept = async(req,res,next)=>{
    let request = await withdrawrequest.findById(req.body.objectId)
 if(!request){
    res.status(400).json({
        status:"Faild",
        message:"Request Not Found"
     })
 }else{
     let user = await userModel.findById(request.user_id)
     if(!user){
        res.status(400).json({
            status:"Failed",
            message:"User not Found"
         })
     }else{
        user.amount -= request.amount;
        await user.save();
        const deletedObject  = await withdrawrequest.deleteOne({ _id: req.body.objectId })
        res.status(200).json({
            status:"Success",
            data : user.amount
         })
     }
 }
}
