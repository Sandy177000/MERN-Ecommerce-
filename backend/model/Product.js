const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: [0, "wrong min price"],
    max: [100000, "wrong max price"],
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min price"],
    max: [100, "wrong max price"],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    max: [5, "wrong max price"],
    required: true,
  },
  stock: {
    type: Number,
    min: [0, "wrong min price"],
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  delete: {
    type: Boolean,
    default: false,
  },
});


const virtual = productSchema.virtual('id');

virtual.get(function(){
  return this._id;
})

productSchema.set('toJSON',{
  virtuals:true,
  versionKey: false,
  transform: function(doc,ret){ delete ret._id}
})






exports.Product = mongoose.model("Product", productSchema);
