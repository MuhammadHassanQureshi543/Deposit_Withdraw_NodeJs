const User = require('../model/userModel'); // Make sure to require the model correctly
const moduale = require('../model/newModel')
const userModel = require('../model/userModel')
const multer = require('multer');
const path = require('path');
const requestModel = require('../model/requestModel');
const withdrawModel = require('../model/withdrawModel')
const axios = require('axios');
const cheerio = require('cheerio');


exports.creatUser = async(req,res,next)=>{
    try{
    const user = await User.create(req.body)
    res.status(200).json({
        status:'Success',
        data:user
    })
    }catch(err){
        if(err.code === 11000){
            let fieldArry = []
            for(const item in err.keyPattern){
                fieldArry.push(item)
            }
            res.status(200).json({
                status:'error',
                message:`duplicate entery on ${fieldArry.join(",")}`,
            })
        }
        
    }
}

exports.loginUser = async(req,res,next)=>{
  let user = await userModel.findOne({email:req.body.email,password:req.body.password})
  if(user === null){
      res.status(200).json({
          status:'Error',
          message:"Login Denied. Maybe Mail or Password Incorect ."
      })
  }else{
      res.status(200).json({
          status:'Success',
          message:"Login Successfull",
          data:user
      })
  }
 
}

exports.depositrequest = async(req,res,next)=>{
  const { user_id, uid, amount, accountNumber, accountTitle } = req.body;

  try {
    // Check if a transaction is already in progress for the given account number
    const existingRequest = await requestModel.findOne({ accountNumber, status: 'Pending' });
    if (existingRequest) {
      return res.status(400).json({ error: 'Transaction in progress' });
    }

    // Create a new request
    const newRequest = await requestModel.create({
      user_id,
      uid,
      amount,
      accountNumber,
      accountTitle,
      status: 'Pending'
    });

    res.status(200).json({
      status: 'Success',
      data: newRequest
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



exports.withdraw = async(req,res,next)=>{
  const { user_id, amount, accountNumber, accountTitle } = req.body;

  try {
    // Check if a transaction is already in progress for the given account number
    const existingRequest = await withdrawModel.findOne({ accountNumber, status: 'Pending' });
    if (existingRequest) {
      return res.status(400).json({ error: 'Transaction in progress' });
    }

    // Create a new request
    const newRequest = await withdrawModel.create({
      user_id,
      amount,
      accountNumber,
      accountTitle,
      status: 'Pending'
    });

    res.status(200).json({
      status: 'Success',
      data: newRequest
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
