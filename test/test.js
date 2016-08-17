class _Promise extends Promise {
    constructor(...args) {
        super(...args)
        console.log('ok');
    }

    then(...args) {
        console.log('ok');
        return super.then(...args)
    }
}

console.log(
new _Promise(a => a()).__proto__ === _Promise
    
);

Promise.resolve(1).then(arg => {
    return new Promise(arg)
}).then(arg => console.log(arg))

function then(resolveHandler, rejectHandler) {
    const newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            // 如果调用then方法的promise的status是rejected
            if(this.status === 'rejected') {
                rejectHandler(this.result)
                return
            }

            // 不是rejected 就是fulfilled
            const returnValue = resolveHandler()
            // 如果returnValue是promise类型的话
            if (returnValue.___proto__ === Promise) {
                // 将newPromise的状态决定权交给returnValue
                returnValue.then(resolve, reject)
            } else {
                resolve()
            }
        }, 0)
    })

    return newPromise
}