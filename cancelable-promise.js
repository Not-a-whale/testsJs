module.exports = class CancelablePromise extends Promise {
    constructor(func) {
        super(func, () =>{
            throw new Error;
        })
        if(func && typeof func === 'function') {
            return this;
        } else {
            throw new Error;
        }
    }
}


function throwError() {
    throw new Error;
}