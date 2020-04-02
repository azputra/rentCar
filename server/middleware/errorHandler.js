"use strict"
module.exports = (err, req, res, next) => {
    console.log(err);
    if (err.status && err.message) {
        res.status(err.status).json(err.message)
    } else if (err.ReferenceError) {
        res.status(400).json(err.ReferenceError)
    } else if (err.name === "JsonWebTokenError") {
        res.status(404).json(err.message)
    } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message })
    } else if (err.name === "ValidationError") {
        const arr = []
        err.errors.forEach(err => {
            arr.push({
                status: 400,
                msg: err.message
            })
        });
        res.status(400).json(arr)
    } else {
        res.status(500).json("Internal Server Error")
    }
}