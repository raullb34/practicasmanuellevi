import fetch from 'node-fetch';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('../config/config.json')

const delDashboard = async (workspaceId, dashboardId, delete_v) => {
    let success = await fetch(`${config.API_URL}/workspace/${workspaceId}/dashboard/${dashboardId}?delete_visualizations=${delete_v}`, {
        method: ('DELETE'),        //optional
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

export default delDashboard;
delDashboard('00000180f60fccc7-546d64ce-5e973575-1aadbf11', '00000180ff4804e7-29983cdf-aeb828e7-6ccb7431');