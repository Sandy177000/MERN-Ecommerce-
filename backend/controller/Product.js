const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  console.log(req.body);
  try {
    const doc = await product.save();
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let query = Product.find({}); // gets all the product documents from db
  let totalProductsQuery = Product.find({});

  // finding the product of requested category and brand filter
  if (req.query.category) {
    query = query.find({ category: req.query.category }); // {[id]: 'desc'} comparator object to sort id accordingly
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }

  if (req.query.brand) {
    query = query.find({ brand: req.query.brand }); // {[id]: 'desc'} comparator object to sort id accordingly
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand }); // {[id]: 'desc'} comparator object to sort id accordingly
  }

  // pagination
  if (req.query._page && req.query._limit) {
    const page = req.query._page;
    const pageSize = req.query._limit;

    query = query.skip(pageSize * (page-1)).limit(pageSize); // skips 0 for page 1, 10*1 for page 2
  }

  // sorting based on the order and id:{price,rating} given
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order }); // {[id]: 'desc'} comparator object to sort id accordingly
    totalProductsQuery = totalProductsQuery.sort({
      [req.query._sort]: req.query._order,
    }); // {[id]: 'desc'} comparator object to sort id accordingly
  }

  const totalDocs = await totalProductsQuery.countDocuments();
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


exports.fetchProductById = async (req,res)=>{
  const {id} = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
}

exports.updateProduct = async (req,res)=>{
  const {id} = req.params;
  try {
    
    const product = await Product.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
}