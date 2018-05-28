const jwt = require('jsonwebtoken')

const config = require('../config')

function encodeToken(username) {
    const payload = {
        // exp: moment().add(2, 'days').unix(),
        iat: moment().unix(),
        sub: username
    }
    return jwt.encode(payload, config.secret);
}

function decodeToken(token, cb) {

    try {
        const payload = jwt.decode(token, config.secret)

        // Check if the token has expired. To do: Trigger issue in db ..
        const now = moment().unix()

        // Check if the token has expired
        if (now > payload.exp) {
            console.log('Token has expired.')
        }

        // Return
        return payload

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    encodeToken,
    decodeToken
}
