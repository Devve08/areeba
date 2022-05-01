const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv').config({ path: '.env' });
const customerRoutes = require("./routes/Customers")
const cors = require("cors")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express()

app.use(express.json())
const port = process.env.PORT || 8080
app.use(cors())

mongoose.connect(process.env.DATABASE_CONNECT)
    .then(() => console.log("connected"))
    .catch((err) => console.log(err.message))

app.use("/api", customerRoutes)
//Extended: http://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Customer API",
            description: "Customer API Information",
        },
        servers: ["http://localhost:8080"],
    },
    apis: [`./routes/*.js`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(port, () => console.log("Server listening at port 8080"))
