require('dotenv').config()

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const name = process.env.MYNAME;
const lastname = process.env.MYLASTNAME;
const phone = process.env.PHONE

module.exports = { email, password, name, lastname, phone }