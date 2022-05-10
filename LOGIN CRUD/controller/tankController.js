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
exports.postCreateTank = async (req, res)=>{
    const newTank = new Tank({
        tankId:req.body.tankId,
        fromParcel:req.body.fromParcel,
        deposit:req.body.deposit
    })

    let success = await newTank.save().catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    });

    if(success){
        if(!success.error){
            return res.send({message:`tank created`});
        }else if(success.error){
            return res.status(400).send({message: "Error: " + success.error});
        }
    }
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
exports.deleteTank = async (req, res)=>{
    const id = req.params.id;

    let success = await Tank.findByIdAndRemove(id).catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    })

    if(success){
        if(!success.error){
            return res.send({message:`tank removed`});
        }else if(success.error){
            return res.status(400).send({message: "Error: " + success.error});
        }
    }else{
        return res.status(400).json({ message: "inexistent tank" });
    }
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
exports.updateTank = async (req, res)=>{
    const id = req.params.id;

    let success = await Tank.findByIdAndUpdate(id, {tankId: req.body.tankId, fromParcel: req.body.fromParcel, deposit: req.body.deposit}).catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    })

    if(success){
        if(!success.error){
            return res.send({message:`tank updated`});
        }else if(success.error){
            return res.status(400).send({message: "Error: " + success.error});
        }
    }else{
        return res.status(400).json({ message: "inexistent tank" });
    }
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
exports.readTank = async (req, res)=>{
    const id = req.params.id;

    let success = await Tank.findById(id).catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    })

    if(success){
        if(!success.error){
            res.json(success);
        }else if(success.error){
            return res.status(400).json({ message: "Error: " + success.error });
        }
    }else{
        return res.status(400).json({ message: "inexistent tank" });
    }
    
    
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
exports.readAllTanks = async (req, res)=>{
    let success = await Tank.find().catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    })
    if(success){
        if(!success.error){
            res.json(success);
        }else if(success.error){
            return res.status(400).json({ message: "Error: " + success.error });
        }
    }
}