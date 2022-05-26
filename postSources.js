import fetch from 'node-fetch';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('../config/config.json')

const postsource = async (workspaceId, name, desc, fieldName, type, date_format, indexed) => {
    let success = await fetch(`${config.API_URL}/workspace/${workspaceId}/sources`, {
        method: ('POST'),        //optional
        body: JSON.stringify({
            name: `${name}`,
            description: `${desc}`,
            features:[
                {
                    name: `${fieldName}`,
                    type: `${type}`,
                    date_format: `${date_format}`,
                    indexed: `${indexed}`
                }
            ]
        }),
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
            return success;
        }else if(success.error){
            return Promise.reject
        }
    }else{
        return Promise.reject
    }
}

export default postsource;
