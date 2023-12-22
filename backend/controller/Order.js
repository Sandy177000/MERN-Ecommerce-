const { Order } = require("../model/Order");

exports.fetchOrdersByUser = async (req, res) => {
  const { user } = req.query;

  try {
    const order = await Order.find({ user: user })
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Order.findByIdAndDelete(id);
    res.status(200);
  } catch (error) {
    res.status(400).json(error);
  }
};


exports.fetchAllOrders = async (req, res) => {
    let query = Order.find({}); // gets all the Order documents from db
    let totalOrdersQuery = Order.find({});
  
    
    // pagination
    if (req.query._page && req.query._limit) {
      const page = req.query._page;
      const pageSize = req.query._limit;
  
      query = query.skip(pageSize * (page-1)).limit(pageSize); // skips 0 for page 1, 10*1 for page 2
    }
  
    // sorting based on the order and id:{price,rating} given
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order }); // {[id]: 'desc'} comparator object to sort id accordingly
      totalOrdersQuery = totalOrdersQuery.sort({
        [req.query._sort]: req.query._order,
      }); // {[id]: 'desc'} comparator object to sort id accordingly
    }
  
    const totalDocs = await totalOrdersQuery.countDocuments();
    console.log(totalDocs);
    try {
      const docs = await query.exec(); // executes find()
      res.set('X-Total-Count', totalDocs); // setting the header
      res.status(200).json(docs);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  };