
const express = require('express')
const router = express.Router();
const userModel = require('../models/userSchema');
const { body, validationResult } = require('express-validator');

router.post("/users",
body('email',"email not in the email formate").isEmail(),
body('phoneNo',"number must be 10 digit").isLength({min : 10})
,(req,res)=>{
    const errors =  validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors: errors.array() })
    }
    const user = new userModel(req.body);
    user.save((err,savedUser)=>{
        if(err){
            res.json(err)
        }else{
            res.json(savedUser)
        }
    })
})

// router.get("/users",(req,res)=>{
//     userModel.find((err,users)=>{
//         if(err){
//             res.json(err)
//         }else{
//             res.json(users)
//         }
//     })
// })

// router.get("/users",(req,res)=>{
//     userModel.findOne({_id : "62bd0c2bf8bfa756fdbb7c95" },(err,users)=>{
//         if(err){
//             res.json(err)
//         }else{
//             res.json(users)
//         }
//     })
// })

router.get("/users",(req,res)=>{
    userModel.find((err,users)=>{
        if(err){
            res.json(err)
        }else{
            res.json(users)
        }
    })
})

// router.get("/users/:id",(req,res)=>{
//     userModel.find({_id : req.params.id}, (err,users)=>{
//         if(err){
//             res.json(err)
//         }else{
//             res.json(users)
//         }
//     })
// })

router.get("/users/:id",(req,res)=>{
    userModel.find({_id : req.params.id}, (err,users)=>{
        if(err || !users){
            if(!users){
               return  res.status(404).json({Error : "no user found with this id "})
            }
           return res.json(err)
        }else{
          return res.json(users)
        }
    })
})

// router.put("/users/:id",(req,res)=>{
//     userModel.updateOne({_id: req.params.id},req.body,(err,result)=>{
//         if(err){
//             res.json(err)
//         }else{
//             res.json(result);
//         }
//     })
// })

// router.put("/users/:id",(req,res)=>{
//     userModel.updateOne({name : "rahul"},req.body,(err,result)=>{
//         if(err){
//             res.json(err)
//         }else{
//             res.json(result);
//         }
//     })
// })

router.put("/users/:id",(req,res)=>{
    userModel.updateMany({name : "rahul"},req.body,(err,result)=>{
        if(err){
            res.json(err)
        }else{
            res.json(result);
        }
    })
})

router.delete("/users/:id",(req,res)=>{
    userModel.deleteOne({_id:req.params.id},(err,user)=>{
        if(err){
            res.json(err);
        }else{
            res.json(user)
        }
    })
})


module.exports = router;