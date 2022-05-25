import fetch from 'node-fetch';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('./config/config.json')

const getWorkspaceById = async (id) => {
    let success = await fetch(`${config.API_URL}/workspace/${id}`, {
        method: ('GET'),        //optional
        headers: {                              //optional
            'Content-Type' : 'application/json',   //optional
            'x-auth-token' : config['x-auth-token']
        },
    })
    .then(res => res.json())
    .catch((err)=>{
        console.error("\nError" + err)
        return {error : err}
    })

    if(success){
        if(!success.error){
            console.log(success)
            return success;
        }else if(success.error){
            return Promise.reject
        }
    }else{
        return Promise.reject
    }
}

getWorkspaceById('00000180f13171ab-10093694-91b5bf63-085bd230');