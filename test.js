const crypto = require('crypto')

function createUniqueId(type = 'user') {
    const unique_string = Date.now().toString(16)
    if (type === 'user') return `${unique_string}/u`
}

// console.log(createUniqueId('user'))

function validateUserId() {
    const userTypes = ['u', 'g', 'o']
    const id = '18f8aa30ssc9/u'

    const seperate = id.split('/')

    if (seperate.length !== 2) throw error

    const [dateString, specialSymbol] = seperate

    if (!userTypes.includes(specialSymbol)) throw error

    const input =   /^[0-9a-f]{11}$/i;

    console.log(input.test(dateString))
}

function validateName() {
    const name = 'adhoa'

    const regex = /^[a-zA-Z]+$/
    const result = regex.test(name)

    console.log(result)
}

// validateUserId()
validateName()