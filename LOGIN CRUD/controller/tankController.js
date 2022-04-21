const mongoose = require('mongoose');
const Tank = require('../model/tank');

//Create Tank
/**
 * 
 * @route POST /tanks
 * @function create a new tank
 * @param {string} tankId.query.required - tankId - eg:tank1 
 * @param {string} fromParcel.query.required - parcel - eg:parcel1
 * @param {objectID} deposit.query.required - deposit - eg:625ece2cd4f2fc40cba9ca11
 * @returns {object} 200 - A message of confirmation
 * @returns {error} 409 - A message about the error
 * @returns {error} default - A message about error
 *  
 */
exports.postCreateTank = (req, res, next)=>{
    const newTank = new Tank({
        tankId:req.body.tankId,
        fromParcel:req.body.fromParcel,
        deposit:req.body.deposit
    })

    Tank.findOne({tankId:req.body.tankId}, (err, existingTank)=>{
        if(existingTank){
            return res.status(409).send({message: `Tank with ID ${req.body.tankId} already exists`});
        }
        newTank.save((err)=>{
            if(err){
                next(err);
            }
            res.send({message: 'Tank created'});
        })
    })
}


//Remove tank
/**
 * 
 * @route DELETE /tanks/:id
 * @function remove a tank
 * @param {:id} id.query.required
 * @returns {object} 200 - A message of confirmation
 * @returns {error} 404 - A message about the error
 * @returns {error} default - A message about error
 *  
 */
exports.deleteTank = (req, res, next)=>{
    const id = req.params.id;
    Tank.findOne({_id:id}, (err, existingTank)=>{
        if(!existingTank){
            return res.status(404).send({message:`Tank with ID ${id} does not exists`});
        }
        Tank.findByIdAndRemove(id, (err)=>{
            if(err){
                next(err);
            }
        })
        res.send({message: 'Tank removed'});
    })
    
}

//Update Tank
/**
 * 
 * @route PATCH /tanks/:id
 * @function update a tank
 * @param {:id} id.query.required
 * @param {string} tankId.query.required - tankId - eg:tank2
 * @param {string} fromParcel.query.required - parcel - eg:parcel2
 * @param {objectID} deposit.query.required - deposit - eg:625ece2cd4f2fc40cba9ca11
 * @returns {object} 200 - A message of confirmation
 * @returns {error} 404 - A message about error
 * @returns {error} default - A message about error
 *  
 */
exports.updateTank = (req, res, next)=>{
    const id = req.params.id;
    Tank.findOne({_id:id}, (err, existingTank)=>{
        if(!existingTank){
            return res.status(400).send({message:`Tank with ID ${id} does not exists`});
        }
        Tank.findByIdAndUpdate(id, {tankId: req.body.tankId, fromParcel: req.body.fromParcel, deposit: req.body.deposit}, (err)=>{
            if(err){
                next(err);
            }
        })        
        res.send({message:`Tank updated`});
    })
   
}

//Read tank
/**
 * 
 * @route GET /tanks/:id
 * @function show info about a tank
 * @param {:id} id.query.required
 * @returns {object} 200 - A json with tank info
 * @returns {error} default - A message about error
 *  
 */
exports.readTank = (req, res, next)=>{
    const id = req.params.id;
    
    Tank.findById(id, (err, tank)=>{
        if(err) next(err);
        res.json(tank);
    })
}

//Read all tanks
/**
 * 
 * @route GET /alltanks
 * @function show info about all tanks
 * @returns {object} 200 - A json with tanks info
 * @returns {error} default - A message about error
 *  
 */
exports.readAllTanks = (req, res, next)=>{
    Tank.find((err, tanks)=>{
        if(err) next(err);
        res.json(tanks)
    })
}