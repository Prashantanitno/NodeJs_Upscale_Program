// const products = require("../model/Product");
const Product = require("../model/Product");
const User = require("../model/UserSchema");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({ products });
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === Number(id));

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { productName, productPrice } = req.body;
  const { id } = req.params;

  try {
    // Find the user who is adding the product
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the product with the user reference
    const product = await Product.create({
      productName: productName,
      productPrice: productPrice,
      added_by: id,
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update product by ID
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { productName, productPrice, productBrand } = req.body;
  const productIndex = products.findIndex((p) => p.id === Number(id));
  if (productIndex !== -1) {
    const updatedProduct = {
      id: Number(id),
      productName,
      productPrice,
      productBrand,
    };
    products[productIndex] = updatedProduct;
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// Delete product by ID
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === Number(id));
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
