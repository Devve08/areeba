const customerModel = require("../models/Customers")
 
 
 const addCustomer = async (customerName, customerAddress, customerNumber) => {
    try {
        let message = ""
        if (!customerNumber) {
            message = "Number is required"
            return message
        } else if (!customerName) {
            message = "Name is required"
            return message
        } else if (!customerAddress) {
            message = "Address is required"
            return message
        } else {
            const newCustomer = new customerModel({
                customerName,
                customerAddress,
                customerNumber
            })
            const saveCustomer = await newCustomer.save()
            message = "Customer added successfully"

            return message
        }
    } catch (error) {
        return error.message
    }
}

module.exports = addCustomer