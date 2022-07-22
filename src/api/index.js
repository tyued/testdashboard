import request from '../utils/request';

const base = 'api'

export async function login(data) {
    return request(`${base}/login`,{
        method: 'post',
        data,
    })
}

export async function getMultilayer(data) {
    return request(`${base}/multilayer`,{
        method: 'post',
        data,
    })
}


