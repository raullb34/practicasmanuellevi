import fetch from 'node-fetch';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('../config/config.json')

const cloneDashboard = async (workspaceId, dashboardId, name) => {
    let success = await fetch(`${config.API_URL}/workspace/${workspaceId}/dashboard/${dashboardId}`, {
        method: ('POST'),        //optional
        body: JSON.stringify({
            name: `${name}`
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
            console.log(success)
            return success;
        }else if(success.error){
            console.log(success)
            return Promise.reject
        }
    }else{
        return Promise.reject
    }
}

export default cloneDashboard;