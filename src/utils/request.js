import fetch from 'axios';
import { notification } from "antd";
import { success } from './tools';
// fetch.defaults.timeout = 200;

export default function request(url, options) {

    return fetch(`${url}`, options)
        .catch(handleError)
        .then((response) => {
            console.log(response, 'response')
            if(response.status === 200){
                // success(response.data);
                return{ data: response.data}
            } else {
                // notification.error({
                //     message: 'An error has occured',
                //     description: response.data.msg,
                //     placement: 'bottomRight',
                // })
            }
            // console.log(response,'response')
            // try{
            //     return { data: response.data };
            // }catch(e){
            //     return { data: response.data };
            // }
        });
}

function handleError(errorObj) {
    console.log('this is error!')
}