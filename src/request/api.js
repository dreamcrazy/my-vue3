import { post } from './request'

const getVteInfo = (data) => {
    return post('/vteUnionNew/getVteRemindInfo', data)
}

const getVisitCount = (data) => {
    return post('/portrait/getVisitCount', data)
}

export {
    getVteInfo,
    getVisitCount
}