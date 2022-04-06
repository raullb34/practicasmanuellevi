const Deposit = require('../model/deposit');
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

        Deposit.findByIdAndUpdate(id, {depositId: req.body.newDepositId, fromTank: req.body.newFromTank, fromCask: req.body.newFromCask, fillDate: req.body.newFillDate, emptyDate: req.body.newEmptyDate}, (err)=>{
            if(err){
                next(err);
            }
        })
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

