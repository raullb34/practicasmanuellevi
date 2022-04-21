const Deposit = require('../model/deposit');
const mongoose = require('mongoose');

//Create Deposit
/**
 * 
 * @route POST /deposits
 * @function create a new deposit
 * @param {string} depositId.query.required - depositID - eg:deposit1 
 * @param {string} fromTank.query.required - tank - eg:tank1
 * @param {string} fromCask.query.required - cask - eg:cask1
 * @param {string} fillDate.query.required - fillDate - eg:2022-04-20
 * @param {string} emptyDate.query.required - emptyDate - eg:2022-04-20
 * @returns {object} 200 - A message of confirmation
 * @returns {error} 409 - A message about the error
 * @returns {error} default - A message about error
 *  
 */

 exports.postCreateDeposit = async (req, res)=>{

    var fillDate = Date.parse(req.body.fillDate);
    var emptyDate = Date.parse(req.body.emptyDate);

    const newDeposit = new Deposit({
        depositId:req.body.depositId,
        fromTank:req.body.fromTank,
        fromCask: req.body.fromCask,
        fillDate: fillDate,
        emptyDate: emptyDate,
    })

    let success = await newDeposit.save().catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    });

    if(success){
        if(!success.error){
            return res.send({message:`Deposit created`});
        }else if(success.error){
            return res.status(400).send({message: "Error: " + success.error});
        }
    }
}


//Remove Deposit
/**
 * 
 * @route DELETE /deposits/:id
 * @function remove a deposit
 * @param {:id} id.query.required
 * @returns {object} 200 - A message of confirmation
 * @returns {error} 404 - A message about the error
 * @returns {error} default - A message about error
 *  
 */
exports.deleteDeposit = async (req, res, next)=>{
    const id  = req.params.id;

    let success = await Deposit.findByIdAndRemove(id).catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    });

    if(success){
        if(!success.error){
            return res.send({message:`Deposit removed`});
        }else if(success.error){
            return res.status(400).send({message: "Error: " + success.error})
        }
    }else{
        return res.status(400).json({ message: "inexistent deposit"});
    }   
}

//Update Deposit
/**
 * 
 * @route PATCH /deposits/:id
 * @function update a deposit
 * @param {:id} id.query.required
 * @param {string} depositId.query.required - depositID - eg:deposit2
 * @param {string} fromTank.query.required - tank - eg:tank2
 * @param {string} fromCask.query.required - cask - eg:cask2
 * @param {string} fillDate.query.required - fillDate - eg:2022-04-20
 * @param {string} emptyDate.query.required - emptyDate - eg:2022-04-20
 * @returns {object} 200 - A message of confirmation
 * @returns {error} 404 - A message about error
 * @returns {error} default - A message about error
 *  
 */

 exports.updateDeposit = async (req, res, next)=>{
    const id = req.params.id;

    var fillDate = Date.parse(req.body.fillDate);
    var emptyDate = Date.parse(req.body.emptyDate);

    
    let success = await Deposit.findByIdAndUpdate(id, {depositId: req.body.depositId, fromTank: req.body.fromTank, fromCask: req.body.fromCask, fillDate: fillDate, emptyDate: emptyDate}).catch((err)=>{
        console.error("\nError: " + err)
        return { error: err }
    })
    
    if(success){
        if(!success.error){
            return res.send({message:`Deposit updated`});
        }else if(success.error){
            return res.status(400).send({message: "Error: " + success.error})
        }
    }else{
        return res.status(400).json({ message: "inexistent deposit"});
    }   
}

//Ver info de un deposito
/**
 * 
 * @route GET /deposits/:id
 * @function show info about a deposit
 * @param {:id} id.query.required
 * @returns {object} 200 - A json with deposit info
 * @returns {error} default - A message about error
 *  
 */
exports.readDeposit = async (req, res)=>{
    const id = req.params.id;
    let success = await Deposit.findById(id).catch((err)=>{
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
        return res.status(400).json({ message: "inexistent deposit" });
    }
}


//Read all deposits
/**
 * 
 * @route GET /alldeposits
 * @function show info about all deposits
 * @returns {object} 200 - A json with deposits info
 * @returns {error} default - A message about error
 *  
 */
exports.readAllDeposits = async (req, res)=>{

    let success = await Deposit.find().catch((err)=>{
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