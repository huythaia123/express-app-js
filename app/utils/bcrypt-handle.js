const { genSalt, hash, compare } = require('bcryptjs')
const env = require('../config/env')

/**
 * hash password function
 * @param {string} password
 * @param {string|number} salt
 * @returns
 */
module.exports.hashPassword = async function hashPassword(password, salt = env.BCRYPT_SALT_ROUNDS) {
    return hash(password, genSalt(salt))
}

/**
 * compare password function
 * @param {string} password
 * @param {string} hashStr
 * @returns
 */
module.exports.comparePassword = async function comparePassword(password, hashStr) {
    return compare(password, hashStr)
}
