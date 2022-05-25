import fetch from 'node-fetch';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('./config/config.json')

const postWorkspaces = async (name, desc) => {
    let success = await fetch(`${config.API_URL}/workspaces`, {
        method: ('POST'),
        body: JSON.stringify({
            name : `${name}`,
            descripction : `${desc}`
        }),        
        headers: {                              
            'Content-Type' : 'application/json',   
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
            console.log(success)
            return success;
        }else if(success.error){
            return Promise.reject
        }
    }else{
        return Promise.reject
    }
}

postWorkspaces("name", "desc");