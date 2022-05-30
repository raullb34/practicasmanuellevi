import fetch from 'node-fetch';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('../config/config.json')

const postVisualizationId = async (workspaceId, visualizationId, params) => {
    let success = await fetch(`${config.API_URL}/workspace/${workspaceId}/visualization/${visualizationId}`, {
        method: ('POST'),        //optional
        body: JSON.stringify({
            name: params.name,
            description: params.description,
            privacy: params.privacy,
            source: params.source,
            configuration: params.configuration
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

export default postVisualizationId;