const program = require('commander')
const callingFunctions = require('./index')

program
    .version('1.0.0')
    .description('Customer Management CLI')

program
    .command('add <firstName> <lastName> <phone> <email>')
    .alias('a')
    .description('Add a new customer to the database')
    .action((firstName, lastName, phone, email) => {
        callingFunctions.addCustomer({firstName,lastName,phone,email})
    })

program
    .command('find <name>')
    .alias('f')
    .description('Find a customer in the database')
    .action(name => {
        callingFunctions.findCustomer(name)
    })

program.parse(process.argv)
