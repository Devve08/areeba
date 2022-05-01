const router = require("express").Router()
const addCustomer = require("../Testfunctions/ValidateCustomer");


const customerModel = require("../models/Customers")




/**
 * @swagger
 * /api/add-customer:
 *   post:
 *      summary: Add new customer
 *      tags: [Customers]
 *      request:
 *          required: true
 *          content: 
 *           application/json:
 *            schema:
 *              type: object 
 *              properties:
 *               customerName:
 *                  type: string
 *               customerAddress:
 *                  type: string
 *               customerNumber:
 *                  type: string
 *              example:
 *                  customerName: Mhamad
 *                  customerAddress: Lebanon
 *                  customerNumber: 96176554929
 *      responses:
 *              200:
 *                  description: Customer added successfully
 */
router.post("/add-customer", async (req, res) => {
    let customerName = req.body.customerName
    let customerAddress = req.body.customerAddress
    let customerNumber = req.body.customerNumber

    try {
        const message = await addCustomer(customerName, customerAddress, customerNumber)

        if (message) {
            res.status(200).json({
                message,
            })
        }

    } catch (error) {
        res.json(error)
    }
})

/**
 * @swagger
 * /api/customers:
 *    get:
 *     tags: [Customers]
 *     description: Request all Customers
 *     responses: 
 *      '200':
 *       description: Customers recieved successfully
 *       content: application/JSON
 *       schemas: 
 *          type: array
 *          items:
 *              customerName:
 *                  type: string
 *                  description: Customer Name
 *              customerAddress:
 *                  type: string
 *                  description: Customer Address
 *              customerNumber:
 *                  type: string
 *                  description: Customer phone number
 */

router.get("/customers", async (req, res) => {
    try {
        const customers = await customerModel.find({})
        res.status(200).json({
            message: "Customers recieved successfully",
            data: customers
        })
    } catch (error) {
        res.json(error)
    }
})

router.put("/update-customer/:id", async (req, res) => {
    try {
        const customer = await customerModel.findByIdAndUpdate(req.params.id, { $set: req.body })

        const customerInfo = await customerModel.findById(req.params.id)
        res.status(200).json({
            message: "Customer updated successfully",
            data: customerInfo
        })
    } catch (error) {
        res.json(error)
    }
})

/**
 * @swagger
 * /api/customer/{id}:
 *   get:
 *     tags: [Customers]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: Customer ID
 *     responses:
 *        200:
 *           description: Customer info by id
 *           content: appliction/json
 *           schemas: 
 *                  type: object
 *                  items:
 *                    customerName:
 *                      type: string
 *                      description: Customer Name
 *                    customerAddress:
 *                      type: string
 *                      description: Customer Address
 *                    customerNumber:
 *                      type: string
 *                      description: Customer phone number
 *        404:
 *           description: Customer not found
 *                  
 *          
 *  
 */

router.get("/customer/:id", async (req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id)

        res.status(200).json({
            message: "Customer recieved successfully",
            data: customer
        })
    } catch (error) {
        res.json(error)
    }
})

/**
 * @swagger
 * /api/delete-customer/{id}:
 *   delete:
 *     summary: Remove customer by id
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer id
 * 
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */

router.delete("/delete-customer/:id", async (req, res) => {
    try {
        const customer = await customerModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Customer deleted successfully",
            data: customer
        })
    } catch (error) {
        res.json(error)
    }
})
module.exports = router

