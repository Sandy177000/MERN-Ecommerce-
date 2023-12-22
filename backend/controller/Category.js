const { Category } = require("../model/Category");

exports.fetchAllCategories = async (req, res) => {
  try {
    const Categories = await Category.find({}).exec();
    res.status(200).json(Categories);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const doc = await category.save();
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
