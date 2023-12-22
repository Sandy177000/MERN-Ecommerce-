const express = require('express');
const server = express();
const mongoose = require('mongoose');
const productsRouter = require('./routes/Products')
const brandsRouter = require('./routes/Brand')
const categoryRouter = require("./routes/Category")
const userRouter = require("./routes/User")
const authRouter = require("./routes/Auth")
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");

const cors = require('cors');

// connect to the mongoose database
main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log("Database connected")
}

// middlewares
server.use(cors({
    exposedHeaders:['x-Total-Count']
}
)); // we cannot communicate one to another server/port directly, to allow this use cors (cross origin resource sharing)

server.use(express.json()) // to parse req.body into json
server.use("/products", productsRouter.router);
server.use("/brands", brandsRouter.router); 
server.use("/category", categoryRouter.router);
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", orderRouter.router);


server.get('/',(req,res)=>{
    res.json({status:"success"})
})


server.listen(8080,()=>console.log("Server is running on 8080"));
