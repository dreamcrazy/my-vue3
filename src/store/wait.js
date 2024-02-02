

export const waitFn = () => {
    let resolveFn = null
    const p = new Promise((resolve) => {
        resolveFn = resolve
    });

    const onReady = cb => {
        p.then(() => {
            cb()
        })
    }

    return {
        resolveFn,
        onReady
    }
}
export const {resolveFn,onReady} = waitFn()
