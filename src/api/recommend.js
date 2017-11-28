import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getRecommend() {
    // 请求的url
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0, // qq
        needNewCode: 1
    })

    return jsonp(url, data, options)
}