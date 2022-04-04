const Deposit = require('../modelo/Deposit');
const mongoose = require('mongoose');

//Create Deposit
exports.postCreateDeposit = (req, res, next)=>{
    const newDeposit = new Deposit({
        depositId:req.body.depositId,
        fromTank:req.body.fromTank,
        fromCask: req.body.fromCask,
        fillDate: req.body.fillDate,
        emptyDate: req.body.emptyDate,
    })

    Deposit.findOne({depositId: req.body.depositId}, (err, existingDeposit)=>{
        if(existingDeposit){
            return res.status(400).send(`Deposit with ID ${req.body.depositId} already exists`);
        }
        newDeposit.save((err)=>{
            if(err){
                next(err);
            }
            res.send(`Deposit created`);
        })
    })
}

//Remove Deposit
exports.deleteDeposit = (req, res, next)=>{
    const id  = req.params.id;

    Deposit.findOne({_id: id}, (err, existingDeposit)=>{
        if(!existingDeposit){
            return res.status(400).send(`Deposit with ID ${id} does not exists`);
        }
        Deposit.findByIdAndRemove(id, (err)=>{
            if(err){
                next(err);
            }
        });
        res.send(`Deposit removed`);
    })

    
}

//Update Deposit
exports.updateDeposit = (req, res, next)=>{
    const id = req.params.id;

    Deposit.findOne({_id: id}, (err, existingDeposit)=>{
        if(!existingDeposit){
            return res.status(400).send(`Deposit with ID ${id} does not exists`);
        }

        if(!req.body.newDepositId==''){  
            Deposit.findByIdAndUpdate(id, {depositId: req.body.newDepositId}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        if(!req.body.newFromTank==''){  
            Deposit.findByIdAndUpdate(id, {fromTank: req.body.newFromTank}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        if(!req.body.newFromCask==''){  
            Deposit.findByIdAndUpdate(id, {fromCask: req.body.newFromCask}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        if(!req.body.newFillDate==''){  
            Deposit.findByIdAndUpdate(id, {fillDate: req.body.newFillDate}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        if(!req.body.newEmptyDate==''){  
            Deposit.findByIdAndUpdate(id, {emptyDate: req.body.newEmptyDate}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        res.send(`Deposit updated`);
    })
}

exports.readDeposit = (req, res, next)=>{
    const id = req.params.id;
    
    Deposit.findById(id, (err, deposit)=>{
        if(err) next(err);
        res.send(deposit);
    })
}

