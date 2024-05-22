/**
 * @file auth.manager.js
 * @description manager the following opertions: finding user, creating user, hashing and verifying password, creating and verifying unique id's
 */

'use strict';

const crypto = require('crypto');
const db = require('../models');

/**
 * @class AuthManager
 * @description manages authentication
 */
class AuthManager {
    /**
     * @async
     * @method findUserByPhoneNumber 
     * @description Find the user with phone number
     * @param {string} phone
     * @throws {Error} trows error in case of any failure
     * @returns {undefined|boolean|Object} - undefined if phone not provided, false if user not found and user object if found
     */
    async findUserByPhoneNumber(phone) {
        try {
            if (!phone) return undefined

            // find the user 
            const user = await db.User.findOne({
                where: { phone }
            })

            if (!user) return false

            return user
        } catch (error) {
            console.log(`utils > auth.manager.js > AuthManager > findUserByPhoneNumber: ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method createUser 
     * @description Create user with name, phone and password
     * @param {string} name
     * @param {string} phone
     * @param {string} password
     * @throws {Error} trows error in case of any failure
     * @returns {undefined|boolean|Object} - undefined if name,phone and password not provided, and if user created, returns user object 
     */
    async createUser(name, phone, password) {
        try {
            if (!name || !phone || !password) return undefined

            // create unique id
            const userId = await this.createUniqueId('user')

            if (!userId) throw error;

            // hash password
            const hashedPassword = await this.hashedPassword(password);

            if (!hashedPassword) throw error;

            // create user
            const user = db.User.create({
                userId: userId,
                name: name,
                phone: phone,
                password: hashedPassword
            })

            if (!user) throw error

            return user
        } catch (error) {
            console.log(`utils > auth.manager.js > AuthManager > createUser: ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method hashedPassword
     * @description salt and hash the password
     * @param {string} password
     * @throws {Error} trows error in case of any failure
     * @returns {string} salted and hashed password
     */
    async hashedPassword(password) {
        try {
            // create a salt
            const salt = crypto.randomBytes(16).toString('hex')

            // create a hash
            const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')

            // combine salt with hash
            const storedPassword = `${salt}:${hashedPassword}`

            return storedPassword
        } catch (error) {
            console.log(`src > utils > auth.manager.js > hashedPassword : ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method verifyPassword
     * @description Verify salted and hashed the password
     * @param {string} enteredPassword - entered password
     * @param {string} storedPassword - stored password
     * @throws {Error} trows error in case of any failure
     * @returns {boolean} True if password is correct
     */
    async verifyPassword(enteredPassword, storedPassword) {
        try {
            const [salt, storedHash] = storedPassword.split(":")

            const enteredHash = crypto.pbkdf2Sync(enteredPassword, salt, 10000, 64, 'sha256').toString('hex')

            return enteredHash === storedHash
        } catch (error) {
            console.log(`src > utils > auth.manager.js > verifyPassword : ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method createUniqueId
     * @description Create unique id for different purpose
     * @param {string} type - unique id type
     * @throws {Error} trows error in case of any failure
     * @returns {string} unique id
     */
    async createUniqueId(type = 'user') {
        try {
            // create unqiue id string
            const unique_string = Date.now().toString(16)
            let id

            // check the id format
            switch (type) {
                case 'user':
                    id = `${unique_string}/u`
                    break;
                case 'contact':
                    id = `${unique_string}/c`
                    break;
                case 'spam':
                    id = `${unique_string}/s`
                    break;
                default:
                    id = `${unique_string}/u`
                    break;
            }

            if (id) return id
        } catch (error) {
            console.log(`src > utils > auth.manager.js > createUniqueId : ${error.message}`)
            throw error
        }
    }

    /**
     * @async
     * @method validateUserId
     * @description validates unique or user id format
     * @param {string} id - unique id 
     * @throws {Error} trows error in case of any failure
     * @returns {boolean} True if id format is correct
     */
    async validateUserId(id) {
        try {
            const userTypes = ['u', 'c', 's']

            const splitId = id.split('/')

            if (splitId.length !== 2) throw new Error("Invalid user id format")

            const [dateString, specialSymbol] = splitId

            if (!userTypes.includes(specialSymbol)) throw new Error("Invalid user id format")

            const dateStringRegex = /^[0-9a-f]{11}$/i;

            if (!dateStringRegex.test(dateString)) throw new Error("Invalid user id format")

            return true
        } catch (error) {
            console.log(`src > utils > auth.manager.js > validateUserId : ${error.message}`)
            throw error
        }
    }
}

module.exports = { AuthManager }