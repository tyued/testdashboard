import request from '../utils/request';

const base = 'api'
const root = 'http://localhost:8400'

export async function login(data) {
    return request(`${root}/${base}/login`,{
        method: 'post',
        data,
    })
}

export async function getMultilayer(data) {
    return request(`${root}/${base}/multilayer`,{
        method: 'post',
        data,
    })
}

export async function getSummaryList(data) {
    return request(`${root}/${base}/tranx/summary`,{
        method: 'post',
        data,
    })
}

export async function getTransactionsList(data) {
    return request(`${root}/${base}/transactions_lookup`,{
        method: 'post',
        data,
    })
}


