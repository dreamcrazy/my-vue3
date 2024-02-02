import axios from 'axios'
import { apiError, error } from '@/utils/log'
import { LogReport } from '../utils/reportUtil'
import { isPc } from '../utils/common'
import { GROUP_ID } from '@/constants'
import * as kkb from '@/utils/kkb'
import { isKKBAPP } from '@/utils/isSystem'
import { LEARN_CENTER_URL, API_BASE_URL } from '../constants/url'

const CancelToken = axios.CancelToken
let pending = []
const removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) {
      pending[p].f()
      pending.splice(p, 1)
    }
  }
}

function getAccessToken() {
  return kkb.cookie.get(`access-${GROUP_ID}`)
}

function getAuthorization() {
  return `Bearer ${isPc() ? 'pc' : 'h5'}:${getAccessToken()}`
}

axios.defaults.withCredentials = true
axios.defaults.timeout = 50000
axios.defaults.headers.common['Content-Type'] = 'application/json'

// 错误状态码 有返回错误直接进行操作-
const errorStatus = [401, 500, 502, 504, 400]
// 接口请求成功的code码
const successCode = [0, 1, '1', '00000']
let baseURL = API_BASE_URL

axios.defaults.baseURL = process.env.NODE_ENV !== 'production' ? '/api' : baseURL

axios.interceptors.request.use(
  request => {
    request.cancelToken = new CancelToken((c) => {
      pending.push({
        u: request.url + '&' + request.method,
        f: c
      })
    })
    /**
     * 2021-11-11 by liteng
     * 为了解决 @kkb/supermatch-react 包中的【vue_mymenu】组件调用阿里云接口withCredentials产生的跨域问题
     */
    if (request.url.includes('ali-cyb-cdn.kaikeba.com')) {
      request.withCredentials = false
    }
    if (isKKBAPP()) {
      request.headers.common.Authorization = `Bearer mobile:${getAccessToken()}`
    } else {
      if (getAccessToken()) {
        request.headers.common.Authorization = `Bearer ${isPc() ? 'pc' : 'h5'}:${getAccessToken()}`
      }
    }
    return request
  }
)

// 中间件 拦截请求-
axios.interceptors.response.use(
  response => {
    if (response.data && !successCode.includes(response.data.code)) {
      LogReport('apiError', response)
    }
    if (errorStatus.indexOf(response.status) > -1) {
    //   router.push({
    //     path: '/'
    //   })
    }
    if ([-403, -505, -201, -202].indexOf(response.data.code) > -1 && !response.config.url.includes('/session')) {
      window.onbeforeunload = () => {}
      document.location.href = `${LEARN_CENTER_URL}/transfer?redirect_uri=${encodeURIComponent(
        window.location.href
      )}`
    }
    return response
  },
  err => {
    if (axios.isCancel(err)) {
      return Promise.reject(new Error('cancel'))
    }
    const res = err.response
    if (res) {
      const option = {
        status: res.status,
        url: res.config.url,
        params: res.config.params
      }
      apiError('ApiError', option)
      LogReport('apiError', res)
    } else {
      error(err)
      LogReport('other', err, {
        msg: [
          { name: '错误信息', value: err?.message },
          {
            name: '请求详细信息',
            value: JSON.stringify(err)
          }
        ]
      })
    }
    return Promise.reject(err)
  }
)

/**
 * get
 * @param url
 * @param data
 * @returns {Promise}
 */

const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
  })
}

/**
 * post
 * @param url
 * @param data
 * @returns {Promise}
 */

const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      response => {
        resolve(response)
      },
      err => {
        reject(err)
      }
    )
  })
}

export default {
  get,
  post,
  removePending,
  getAuthorization
}
