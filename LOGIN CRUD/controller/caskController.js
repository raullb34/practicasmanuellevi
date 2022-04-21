const Cask = require('../model/cask');
const mongoose = require('mongoose');

//Create Cask
/**
 * 
 * @route POST /casks
 * @function create a new cask
 * @param {string} caskId.query.required - caskId - eg:cask1 
 * @param {string} material.query.required - material - eg:madera
 * @param {string} creationDate.query.required - creationDate - eg:2022-04-20
 * @param {string} removeDate.query.required - removeDate - eg:2022-04-20
 * @param {objectID} deposit.query.required - deposit - eg:625ece2cd4f2fc40cba9ca11
 * @returns {object} 200 - A message of confirmation
 * @returns {error} 409 - A message about the error
 * @returns {error} default - A message about error
 *  
 */
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
            return res.status(409).send({message: `Cask with ID ${req.body.caskId} already exists`});
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
/**
 * 
 * @route DELETE /casks/:id
 * @function remove a cask
 * @param {:id} id.query.required
 * @returns {object} 200 - A message of confirmation
 * @returns {error} 404 - A message about the error
 * @returns {error} default - A message about error
 *  
 */
exports.deleteCask = (req, res, next)=>{
    const id  = req.params.id;
    Cask.findOne({_id: id}, (err, existingCask)=>{
        if(!existingCask){
            return res.status(404).send({message: `Cask with ID ${id} does not exists`});
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
/**
 * 
 * @route PATCH /casks/:id
 * @function update a cask
 * @param {:id} id.query.required
 * @param {string} caskId.query.required - caskId - eg:cask2 
 * @param {string} material.query.required - material - eg:metal
 * @param {string} creationDate.query.required - creationDate - eg:2022-04-20
 * @param {string} removeDate.query.required - removeDate - eg:2022-04-20
 * @param {objectID} deposit.query.required - deposit - eg:625ece2cd4f2fc40cba9ca11
 * @returns {object} 200 - A message of confirmation
 * @returns {error} 404 - A message about error
 * @returns {error} default - A message about error
 *  
 */
exports.updateCask = (req, res, next)=>{
    const id = req.params.id;

    var creationDate = req.body.creationDate;
    var removeDate = req.body.removeDate;

    Cask.findOne({_id: id}, (err, existingCask)=>{
        if(!existingCask){
            return res.status(404).send({message: `Cask with ID ${id} does not exists`});
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
/**
 * 
 * @route GET /casks/:id
 * @function show info about a cask
 * @param {:id} id.query.required
 * @returns {object} 200 - A json with cask info
 * @returns {error} default - A message about error
 *  
 */
exports.readCask = (req, res, next)=>{
    const id = req.params.id;
    
    Cask.findById(id, (err, cask)=>{
        if(err) next(err);
        res.json(cask);
    })
}


//Read all casks
/**
 * 
 * @route GET /allcasks
 * @function show info about all casks
 * @returns {object} 200 - A json with casks info
 * @returns {error} default - A message about error
 *  
 */
exports.readAllCasks = (req, res, next)=>{
    Cask.find((err, casks)=>{
        if(err) next(err);
        res.json(casks)
    })
}