const Deposit = require('../model/deposit');
const mongoose = require('mongoose');

//Create Deposit
exports.postCreateDeposit = (req, res, next)=>{

    var fillDate = Date.parse(req.body.fillDate);
    var emptyDate = Date.parse(req.body.emptyDate);

    const newDeposit = new Deposit({
        depositId:req.body.depositId,
        fromTank:req.body.fromTank,
        fromCask: req.body.fromCask,
        fillDate: fillDate,
        emptyDate: emptyDate,
    })

    

    Deposit.findOne({depositId: req.body.depositId}, (err, existingDeposit)=>{
        if(existingDeposit){
            return res.status(400).send({message:`Deposit with ID ${req.body.depositId} already exists`});
        }
        newDeposit.save((err)=>{
            if(err){
                next(err);
            }
            res.send({message:`Deposit created`});
        })
    })
}

//Remove Deposit
exports.deleteDeposit = (req, res, next)=>{
    const id  = req.params.id;

    Deposit.findOne({_id: id}, (err, existingDeposit)=>{
        if(!existingDeposit){
            return res.status(400).send({message:`Deposit with ID ${id} does not exists`});
        }
        Deposit.findByIdAndRemove(id, (err)=>{
            if(err){
                next(err);
            }
        });
        res.send({message:`Deposit removed`});
    })

    
}

//Update Deposit
exports.updateDeposit = (req, res, next)=>{
    const id = req.params.id;

    Deposit.findOne({_id: id}, (err, existingDeposit)=>{
        if(!existingDeposit){
            return res.status(400).send({message:`Deposit with ID ${id} does not exists`});
        }

        var fillDate = Date.parse(req.body.fillDate);
        var emptyDate = Date.parse(req.body.emptyDate);

        Deposit.findByIdAndUpdate(id, {depositId: req.body.depositId, fromTank: req.body.fromTank, fromCask: req.body.fromCask, fillDate: fillDate, emptyDate: emptyDate}, (err)=>{
            if(err){
                next(err);
            }
        })
        res.send({message: `Deposit updated`});
    })
}

exports.readDeposit = (req, res, next)=>{
    const id = req.params.id;
    
    Deposit.findById(id, (err, deposit)=>{
        if(err) next(err);
        res.json(deposit);
    })
}


//Read all deposits
exports.readAllDeposits = (req, res, next)=>{
    Deposit.find((err, deposits)=>{
        if(err) next(err);
        res.json(deposits)
    })
}