import fetch from 'axios';
import { notification } from "antd";
import { success } from './tools';
// fetch.defaults.timeout = 200;

// const CancelToken = fetch.CancelToken;
// const controll = new AbortController();

const service = fetch.create();

const allPendingRequestsRecord = [];
const pending = {};

const removeAllPendingRequestsRecord = () => {
    allPendingRequestsRecord && allPendingRequestsRecord.forEach((func) => {
        func('路由跳转取消所有请求');
    });
    allPendingRequestsRecord.splice(0);
};

const removePending = (key, isRequest = false) => {
    if(pending[key] && isRequest) {
        pending[key]('取消重复请求');
    }
    delete pending[key];
};

export const getConfirmation = (mes='', callback = () => {}) => {
    removeAllPendingRequestsRecord();
    callback();
};

service.interceptors.request.use(
    config => {
        // console.log(config, 'config')
        let reqData = '';
        reqData = config.url + config.method + JSON.stringify(config.params||config.data);
        removePending(reqData, true);

        config.cancelToken = new fetch.CancelToken((c) => {
            pending[reqData] = c;
            allPendingRequestsRecord.push(c);
        })

        return config
    },
    err => Promise.reject(err)
)

service.interceptors.response.use(
    response => {
        // console.log(response, '这里是结果')
        // return response
        if(response.status === 200){
            return { data: response.data }
        } else {
            // notification.error({
            //     message: 'An error has occured',
            //     description: response.data.msg,
            //     placement: 'bottomRight',
            // })
        }
    },
    error => {
        if(fetch.isCancel(error)) {
            return new Promise(() => {});
        }
    }
)

export default service;

// export default function request(url, options) {

//     return fetch(`${url}`, options)
//         .catch(handleError)
//         .then((response) => {
//             // console.log(response, 'response')
//             if(response.status === 200){
//                 // success(response.data);
//                 return{ data: response.data}
//             } else {
//                 // notification.error({
//                 //     message: 'An error has occured',
//                 //     description: response.data.msg,
//                 //     placement: 'bottomRight',
//                 // })
//             }
//             // console.log(response,'response')
//             // try{
//             //     return { data: response.data };
//             // }catch(e){
//             //     return { data: response.data };
//             // }
//         });
// }

function handleError(errorObj) {
    console.log('this is error!')
}