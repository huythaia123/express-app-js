const { cleanEnv, str, port, num } = require('envalid')

const env = cleanEnv(process.env, {
    // # APP
    PORT: port(),

    // # DB
    MONGO_URI: str(),
    MONGO_DB_NAME: str(),

    // # BCRYPT
    BCRYPT_SALT_ROUNDS: num(),
})

module.exports = env
