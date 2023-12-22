const express = require("express");
const { createOrder, fetchOrdersByUser, updateOrder, deleteOrder, fetchAllOrders } = require("../controller/Order");

const router = express.Router();

router.post("/", createOrder);
router.get("/:user", fetchOrdersByUser);

router.get("/", fetchAllOrders);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

exports.router = router;
