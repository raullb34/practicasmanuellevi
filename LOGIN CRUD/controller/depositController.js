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
            return res.status(409).send({message:`Deposit with ID ${req.body.depositId} already exists`});
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
exports.deleteDeposit = (req, res, next)=>{
    const id  = req.params.id;

    Deposit.findOne({_id: id}, (err, existingDeposit)=>{
        if(!existingDeposit){
            return res.status(404).send({message:`Deposit with ID ${id} does not exists`});
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
exports.updateDeposit = (req, res, next)=>{
    const id = req.params.id;

    Deposit.findOne({_id: id}, (err, existingDeposit)=>{
        if(!existingDeposit){
            return res.status(404).send({message:`Deposit with ID ${id} does not exists`});
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
exports.readDeposit = (req, res, next)=>{
    const id = req.params.id;
    
    Deposit.findById(id, (err, deposit)=>{
        if(err) next(err);
        res.json(deposit);
    })
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
exports.readAllDeposits = (req, res, next)=>{
    Deposit.find((err, deposits)=>{
        if(err) next(err);
        res.json(deposits)
    })
}