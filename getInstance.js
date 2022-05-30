import fetch from 'node-fetch';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('../config/config.json')

const getInstances = async (workspaceId, sourceId, select, where, order_by, offset, limit) => {
    let success = await fetch(`${config.API_URL}/workspace/${workspaceId}/source/${sourceId}/instances?select=${select}&where=${where}&order_by=${order_by}&offset=${offset}&limit=${limit}`, {
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

export default getInstances;