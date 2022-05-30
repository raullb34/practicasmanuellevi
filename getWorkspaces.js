import fetch from 'node-fetch';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('../config/config.json')

const getWorkspaces = async () => {
    let success = await fetch(`${config.API_URL}/workspaces`, {
        method: ('GET'),        //optional
        headers: {                              //optional
            'Content-Type' : 'application/json',   //optional
            'x-auth-token' : config['x-auth-token'],
            'x-deepint-organization' : config['x-deepint-organization']
        },
    })
    .then(res => res.json())
    .catch((err)=>{
        console.error("\nError" + err)
        return {error : err}
    })

    if(success){
        if(!success.error){
            return success;
        }else if(success.error){
            return Promise.reject
        }
    }else{
        return Promise.reject
    }
}

export default getWorkspaces;