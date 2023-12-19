const express = require("express");
const Task = require("../models/task.model.js");
const isLoggedIn = require("../middleware/isLoggedIn.middleware.js");
const user = require("../models/user.model.js");
const router = express.Router();

// Create Task
router.post('/add-task', isLoggedIn, async (req, res) => {
    try{
        const body = {
            title: req.body.title,
            description: req.body.description,
            email: req.user.email
        }
        const newTask = await Task.create(body);
        newTask.save().then(() => console.log("Task added"));
        res.sendStatus(200);
    }catch(e){
        console.log(e);
    }
    
});

//Retreive Task Route
router.get("/",isLoggedIn, async (req,res)=>{
    try{
    const userTask = await Task.find({email: req.user.email});
    res.status(200).json(userTask);
    }catch(e){
        console.log(e);
    }
});

//Delete Tasks Route
router.post("/delete", isLoggedIn, async (req,res)=>{
    try{
    const userTask = await Task.findOne({title: req.body.title});
    console.log(userTask.email, req.user.email);
    if(req.user.email !== userTask.email){
        res.status(400).json("Unauthorised");
    } else {
        await Task.findOneAndDelete({title: req.body.title});
        res.status(200).json("Deleted");
    }
    }catch(e){
        console.log(e);
    }
})


module.exports= router;