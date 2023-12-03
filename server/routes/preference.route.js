const express = require("express");
const preference = require("../models/preference.model.js");
const isLoggedIn = require("../middleware/isLoggedIn.middleware.js");
const user = require("../models/user.model.js");
const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body);
    try{
    const newPreference = await preference.create(req.body);
    newPreference.save().then(() => console.log("Preference added"));
    res.sendStatus(200);
    }catch(e){
        console.log(e);
    }
    
});

router.get("/",isLoggedIn, async (req,res)=>{
    try{
    const user_detail = await user.findOne({email:req.user.email});
    const userPreference = await preference.findOne({pref_id: user_detail.pref_id});
    res.status(200).json(userPreference);
    }catch(e){
        console.log(e);
    }
});

router.get("/all", async (req,res)=>{
    try{
    const userPreference = await preference.find();
    res.status(200).json(userPreference);
    }catch(e){
        console.log(e);
    }
})

router.post("/set?:id",async(req,res)=>{
    try{
        const user_pref = await user.findOneAndUpdate({email:req.user.email},{pref_id:req.params.id});
        res.status(200).json(userPreference);
    }catch(e){
        console.log(e);
    }
})

module.exports= router;