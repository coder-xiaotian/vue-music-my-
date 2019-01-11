import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

export function getHotKey() {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        needNewCode: 1
    })

    return jsonp(url, data, options)
}

export function searchFor(searchKey, page) {
    const url = 'api/searchFor'

    const data = Object.assign({}, commonParams, {
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
        w: searchKey,
        zhidaqu: 1,
        catZhida: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: 20,
        n: 20,
        p: page,
        remoteplace: 'txt.mqq.all'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
