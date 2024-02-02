
export default function delay(ms,{ value,willResolve = true }) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(willResolve){
                resolve(value)
            } else {
                reject(value)
            }
        }, ms);
    })
}