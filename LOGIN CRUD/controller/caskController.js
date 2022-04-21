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
exports.postCreateCask = async (req, res)=>{

    var creationDate = Date.parse(req.body.creationDate);
    var removeDate = Date.parse(req.body.removeDate);

    const newCask = new Cask({
    caskId:req.body.caskId,
    material: req.body.material,
    creationDate: creationDate,
    removeDate: removeDate,
    deposit:req.body.deposit
    })

    let success = await newCask.save().catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    });

    if(success){
        if(!success.error){
            return res.send({message:`cask created`});
        }else if(success.error){
            return res.status(400).send({message: "Error: " + success.error});
        }
    }
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
exports.deleteCask = async (req, res)=>{
    const id  = req.params.id;

    let success = await Cask.findByIdAndRemove(id).catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    });

    if(success){
        if(!success.error){
            return res.send({message:`cask deleted`});
        }else if(success.error){
            return res.status(400).send({message: "Error: " + success.error});
        }
    }else{
        return res.status(400).json({ message: "inexistent cask" });
    }
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
exports.updateCask = async (req, res)=>{
    const id = req.params.id;

    var creationDate = Date.parse(req.body.creationDate);
    var removeDate = Date.parse(req.body.removeDate);

    let success = await Cask.findByIdAndUpdate(id, {caskId: req.body.caskId, material: req.body.material, creationDate: creationDate, removeDate: removeDate, deposit: req.body.deposit}).catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    })

    if(success){
        if(!success.error){
            return res.send({message:`cask updated`});
        }else if(success.error){
            return res.status(400).send({message: "Error: " + success.error});
        }
    }else{
        return res.status(400).json({ message: "inexistent cask" });
    }
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
exports.readCask = async (req, res)=>{
    const id = req.params.id;
    let success = await Cask.findById(id).catch((err)=>{
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
        return res.status(400).json({ message: "inexistent cask" });
    }
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
exports.readAllCasks = async (req, res)=>{
    let success = await Cask.find().catch((err)=>{
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