'use strict'

module.exports = (err, req, res, next) => {
    console.log(err)
    let status = null
    let message = null
    if (err.name === 'ValidationError') {
        status = 400
        let arr = []
        for (const key in err.errors) {
            arr.push(err.errors[key].message)
        }
        message = arr
    } else {
        status = err.status || 500
        message = err.message || 'Internal Server Error'
    }
    res.status(status).json(message)
}