const mongoose = require('mongoose');
const Tank = require('../modelo/Tank');

//Create Tank
exports.postCreateTank = (req, res, next)=>{
    const newTank = new Tank({
        tankId:req.body.tankId,
        fromParcel:req.body.fromParcel,
        deposit:req.body.deposit
    })

    Tank.findOne({tankId:req.body.tankId}, (err, existingTank)=>{
        if(existingTank){
            return res.status(400).send(`Tank with ID ${req.body.tankId} already exists`);
        }
        newTank.save((err)=>{
            if(err){
                next(err);
            }
            res.send('Tank created');
        })
    })
}


//Remove tank
exports.deleteTank = (req, res, next)=>{
    const id = req.params.id;
    Tank.findOne({_id:id}, (err, existingTank)=>{
        if(!existingTank){
            return res.status(400).send(`Tank with ID ${id} does not exists`);
        }
        Tank.findByIdAndRemove(id, (err)=>{
            if(err){
                next(err);
            }
        })
        res.send('Tank removed');
    })
    
}

//Update Tank
exports.updateTank = (req, res, next)=>{
    const id = req.params.id;
    Tank.findOne({_id:id}, (err, existingTank)=>{
        if(!existingTank){
            return res.status(400).send(`Tank with ID ${id} does not exists`);
        }
        if(!req.body.newTankId==''){  
        
            Tank.findByIdAndUpdate(id, {tankId: req.body.newTankId}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        if(!req.body.newFromParcel==''){  
            Tank.findByIdAndUpdate(id, {fromParcel: req.body.newFromParcel}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }        
        if(!req.body.newDeposit==''){  
            Tank.findByIdAndUpdate(id, {deposit: req.body.newDeposit}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        res.send(`Tank updated`);
    })
   
}

//Read tank
exports.readTank = (req, res, next)=>{
    const id = req.params.id;
    
    Tank.findById(id, (err, tank)=>{
        if(err) next(err);
        res.send(tank);
    })
}