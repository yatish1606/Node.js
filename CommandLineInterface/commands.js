#!/usr/bin/env node

const program = require('commander')
const callingFunctions = require('./index')
const {prompt} = require('inquirer')
const { addCustomer } = require('./index')

const customerQuestions = [
    {
        type : 'input',
        name : 'firstName',
        message : 'Customer first name'
    },
    {
        type : 'input',
        name : 'lastName',
        message : 'Customer last name'
    },
    {
        type : 'input',
        name : 'phone',
        message : 'Customer phone number'
    },
    {
        type : 'input',
        name : 'email',
        message : 'Customer email address'
    },
]

program
    .version('1.0.0')
    .description('Customer Management CLI')

program
    .command('add')
    .alias('a')
    .description('Add a new customer to the databse')
    .action(() => {
        prompt(customerQuestions)
            .then(answers => {
                callingFunctions.addCustomer(answers)
            })
    })

program
    .command('find <name>')
    .alias('f')
    .description('Find a customer in the database')
    .action(name => {
        callingFunctions.findCustomer(name)
    })

program
    .command('update <_id>')
    .alias('u')
    .description('Update a customer in the databse')
    .action(_id => {
        prompt(customerQuestions)
            .then(answers => {
                callingFunctions.updateCustomer(_id,answers)
            })
    })

program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a customer from the database')
    .action(_id => {
        callingFunctions.removeCustomer(_id)
    })

program
    .command('list')
    .alias('l')
    .description('List out all the customers in the database')
    .action(() => callingFunctions.listAllCustomers())

program.parse(process.argv)
