import fetch from 'node-fetch';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require('../config/config.json')

const postDashboards = async (id, name, desc, privacy, shareOpt, gaId, restricted, conf) => {
    let success = await fetch(`${config.API_URL}/workspace/${id}/dashboards`, {
        method: ('POST'),        //optional
        body:JSON.stringify({
            name: `${name}`,
            description: `${desc}`,
            privacy: `${privacy}`,
            shareOpt: `${shareOpt}`,
            gaId: `${gaId}`,
            restricted: restricted,
            configuration: conf
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

export default postDashboards;