const Cask = require('../model/cask');
const mongoose = require('mongoose');

//Create Cask
exports.postCreateCask = (req, res, next)=>{

    var creationDate = req.body.creationDate;
    var removeDate = req.body.removeDate;

    const newCask = new Cask({
    caskId:req.body.caskId,
    material: req.body.material,
    creationDate: creationDate,
    removeDate: removeDate,
    deposit:req.body.deposit
    })
    
    Cask.findOne({caskId: req.body.caskId}, (err, existingCask)=>{
        if(existingCask){
            return res.status(400).send({message: `Cask with ID ${req.body.caskId} already exists`});
        }
        newCask.save((err)=>{
            if(err){
                next(err);
            }
            res.send({message: 'Cask created'});
        })
    })    
}


//Remove Cask
exports.deleteCask = (req, res, next)=>{
    const id  = req.params.id;
    Cask.findOne({_id: id}, (err, existingCask)=>{
        if(!existingCask){
            return res.status(400).send({message: `Cask with ID ${id} does not exists`});
        }
        Cask.findByIdAndRemove(id, (err)=>{
            if(err){
                next(err);
            }
        });
        res.send({message: `Cask removed`});
    })    
}


//Update Cask
exports.updateCask = (req, res, next)=>{
    const id = req.params.id;

    var creationDate = req.body.creationDate;
    var removeDate = req.body.removeDate;

    Cask.findOne({_id: id}, (err, existingCask)=>{
        if(!existingCask){
            return res.status(400).send({message: `Cask with ID ${id} does not exists`});
        }
        Cask.findByIdAndUpdate(id, {caskId: req.body.caskId, material: req.body.material, creationDate: creationDate, removeDate: removeDate, deposit: req.body.deposit}, (err)=>{
            if(err){
                next(err);
            }
        })
        res.send({message:`Cask updated`});
    })    
}


//Read Cask
exports.readCask = (req, res, next)=>{
    const id = req.params.id;
    
    Cask.findById(id, (err, cask)=>{
        if(err) next(err);
        res.json(cask);
    })
}


//Read all casks
exports.readAllCasks = (req, res, next)=>{
    Cask.find((err, casks)=>{
        if(err) next(err);
        res.json(casks)
    })
}