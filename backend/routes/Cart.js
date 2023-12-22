const express = require("express");
const { fetchCartByUser, addtoCart, deleteFromCart, updateCart } = require("../controller/Cart");

const router = express.Router();

router.get("/", fetchCartByUser)
        .post("/",addtoCart)
        .delete('/:id',deleteFromCart)
        .patch("/:id",updateCart)

exports.router = router;
