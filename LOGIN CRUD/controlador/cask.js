const Cask = require('../modelo/Cask');
const mongoose = require('mongoose');

//Create Cask
exports.postCreateCask = (req, res, next)=>{
    const newCask = new Cask({
    caskId:req.body.caskId,
    material: req.body.material,
    creationDate: req.body.creationDate,
    removeDate: req.body.removeDate,
    deposit:req.body.deposit
    })
    
    Cask.findOne({caskId: req.body.caskId}, (err, existingCask)=>{
        if(existingCask){
            return res.status(400).send(`Cask with ID ${req.body.caskId} already exists`);
        }
        newCask.save((err)=>{
            if(err){
                next(err);
            }
            res.send('Cask created');
        })
    })    
}


//Remove Cask
exports.deleteCask = (req, res, next)=>{
    const id  = req.params.id;
    Cask.findOne({_id: id}, (err, existingCask)=>{
        if(!existingCask){
            return res.status(400).send(`Cask with ID ${id} does not exists`);
        }
        Cask.findByIdAndRemove(id, (err)=>{
            if(err){
                next(err);
            }
        });
        res.send(`Cask removed`);
    })    
}


//Update Cask
exports.updateCask = (req, res, next)=>{
    const id = req.params.id;

    Cask.findOne({_id: id}, (err, existingCask)=>{
        if(!existingCask){
            return res.status(400).send(`Cask with ID ${id} does not exists`);
        }
        if(!req.body.newCaskId==''){  
        
            Cask.findByIdAndUpdate(id, {caskId: req.body.newCaskId}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        if(!req.body.newMaterial==''){  
            Cask.findByIdAndUpdate(id, {material: req.body.newMaterial}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        if(!req.body.newCreationDate==''){  
            Cask.findByIdAndUpdate(id, {creationDate: req.body.newCreationDate}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        if(!req.body.newRemoveDate==''){  
            Cask.findByIdAndUpdate(id, {removeDate: req.body.newRemoveDate}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        if(!req.body.newDeposit==''){  
            Cask.findByIdAndUpdate(id, {deposit: req.body.newDeposit}, (err)=>{
                if(err){
                    next(err);
                }
            })
        }
        res.send(`Cask updated`);
    })    
}


//Read Cask
exports.readCask = (req, res, next)=>{
    const id = req.params.id;
    
    Cask.findById(id, (err, cask)=>{
        if(err) next(err);
        res.send(cask);
    })
}