const mongoose = require('mongoose')
const Customer = require('./models/customer')
const customer = require('./models/customer')

mongoose.Promise = global.Promise
const db = mongoose.connect('mongodb://localhost:27017/CustomerCLI', {
    // useMongoClient : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
})


const addCustomer = (customer) => {
    Customer.create(customer)
        .then(customer => {
            console.info('New customer added')
            db.close()
        })
}

const findCustomer = (name) => {
    const search = new RegExp(name, 'i')
    Customer.find({$or : [{firstName : search}, {lastName : search}]})
        .then(customer => {
            console.info(customer)
            console.info(`${customer.length} matches`)
            db.close()
        })
}

const updateCustomer = (_id, customer) => {
    Customer.update({_id}, customer)
        .then(customer => console.info('Customer has been updated'))
        db.close()
}

const removeCustomer = _id => {
    Customer.deleteOne({_id})
        .then(customer => {
            console.info('Customer removed')
            db.close()
        })
}
        

const listAllCustomers = () => {
    Customer.find()
        .then(customers => {
            console.info(customers)
            console.info(`${customers.length} customers`)
            db.close()
        })     
}

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listAllCustomers
}