const mongoose = require('mongoose');
const Tank = require('../model/tank');

//Create Tank
exports.postCreateTank = (req, res, next)=>{
    const newTank = new Tank({
        tankId:req.body.tankId,
        fromParcel:req.body.fromParcel,
        deposit:req.body.deposit
    })

    Tank.findOne({tankId:req.body.tankId}, (err, existingTank)=>{
        if(existingTank){
            return res.status(400).json(`Tank with ID ${req.body.tankId} already exists`);
        }
        newTank.save((err)=>{
            if(err){
                next(err);
            }
            res.json('Tank created');
        })
    })
}


//Remove tank
exports.deleteTank = (req, res, next)=>{
    const id = req.params.id;
    Tank.findOne({_id:id}, (err, existingTank)=>{
        if(!existingTank){
            return res.status(400).json(`Tank with ID ${id} does not exists`);
        }
        Tank.findByIdAndRemove(id, (err)=>{
            if(err){
                next(err);
            }
        })
        res.json('Tank removed');
    })
    
}

//Update Tank
exports.updateTank = (req, res, next)=>{
    const id = req.params.id;
    Tank.findOne({_id:id}, (err, existingTank)=>{
        if(!existingTank){
            return res.status(400).json(`Tank with ID ${id} does not exists`);
        }
        Tank.findByIdAndUpdate(id, {tankId: req.body.tankId, fromParcel: req.body.fromParcel, deposit: req.body.deposit}, (err)=>{
            if(err){
                next(err);
            }
        })        
        res.json(`Tank updated`);
    })
   
}

//Read tank
exports.readTank = (req, res, next)=>{
    const id = req.params.id;
    
    Tank.findById(id, (err, tank)=>{
        if(err) next(err);
        res.json(tank);
    })
}

//Read all tanks
exports.readAllTanks = (req, res, next)=>{
    Tank.find((err, tanks)=>{
        if(err) next(err);
        res.json(tanks)
    })
}