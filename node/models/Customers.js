const mongoose = require("mongoose")

const createCustomer = new mongoose.Schema({
    customerName:{
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    customerNumber: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('customer', createCustomer)