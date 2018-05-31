const jwt = require('jwt-simple');
const config = require('../config')
const moment = require('moment')

function encodeToken(id) {

    const payload = {
        sub: id
    }

    return jwt.encode(payload, config.secret)
}

function decodeToken(token) {

    try {

        return payload = jwt.decode(token, config.secret)

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    encodeToken,
    decodeToken
}