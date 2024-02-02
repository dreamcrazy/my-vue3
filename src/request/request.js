import axios from 'axios'

const CancelToken = axios.CancelToken
// eslint-disable-next-line no-unused-vars
const source = CancelToken.source()
const abortArr = []

const refreshToken = () => {
    let token = 'GGxT+cGQhGNIsMcVrlbVQuBFJrYV55i+9dAxD5xXRlL6bdFmEnkJWkp4y0vgsAMHtODoZ51daxHsPtvnFdTj4xpA317C94Du/ROZkiBnGEUMtrXBfaLt8RUummHPbUOx9O4sU3Q9119yaeQ2RMWL6d96yb4U8Id7B4lZKF8ZLBfCA1bEIK7/8m4UuAZ36pEi2VtanCAj3lseqLb2nAHOBw1t4DYnke/7+qiWnz709HLoyipD7Xfb4h8N8XnY7Jo6TMyaQjv3cbVSkTQNBSvg/PUTro6/0DhPd1POv241mbQ='
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(token)
        }, 1000);
    })
}
let isRefreshing = false
let waitQueue = []

const instance = axios.create({
    baseURL:'/page',
    timeout: 10000,
    withCredentials:false,
    headers:{
        'Content-Type':'application/json',
        token: sessionStorage.getItem("token")
    }
})

instance.interceptors.request.use(config => {
    return config
})

instance.interceptors.response.use(response => {
    const { code } = response.data
    const config = response.config
    if(code == 401){
        if(!isRefreshing){
            isRefreshing = true
            return refreshToken().then(res => {
                config.headers['token'] = res
                while(waitQueue.length){
                    let cb = waitQueue.shift()
                    cb(res)
                }
                return instance(config)
            })
        } else {
            return new Promise((resolve) => {
                waitQueue.push((token) => {
                    config.headers['token'] = token
                    resolve(instance(config))
                })
            })
        }
        
    }
    return response
},err=> {
    return Promise.reject(err)
})

export default instance

const post = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance.post(url, params, {
            ...config,
            // cancelToken:source.token
            cancelToken: new CancelToken(function executor(c){
                abortArr.push(c)
            })
        }).then(res => {
            if (config.getToken) {
                resolve(res)
            } else if(res) {
                resolve(res.data)
            }else {
                resolve(res)
            }
        }, err => {
            reject(err)
        })
    })
}
//取消请求
// setTimeout(() => {
//     source.cancel('不请求了')
// }, 10);

//取消请求2
// setTimeout(() => {
//     abortArr.forEach(c => c('请求取消'))
// }, 10);

// const post = (url, params, config = {}) => {
//     return new Promise((resolve, reject) => {
//         instance.post(url, params, {
//             ...config
//         }).then(res => {
//             if (config.getToken) {
//                 resolve(res)
//             } else {
//                 resolve(res.data)
//             }
//         }, err => {
//             reject(err)
//         })
//     })
// }
  
  export {
    post,
  }