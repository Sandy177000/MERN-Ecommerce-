const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      res
        .status(200)
        .json({ id: user.id, email: user.email, addresses: user.addresses,role:user.role });
    else res.status(401);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
