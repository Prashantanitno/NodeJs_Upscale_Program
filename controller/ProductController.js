const products = require("../model/Product");

exports.getAllProducts = (req, res) => {
  res.status(200).json(products);
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
  exports.createProduct = (req, res) => {
    const { productName, productPrice, productBrand } = req.body;
    const id = products.length + 1;
    const newProduct = { id, productName, productPrice, productBrand };
    products.push(newProduct);
    res.status(201).json(newProduct);
  };
  

  // Update product by ID
  exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { productName, productPrice, productBrand } = req.body;
    const productIndex = products.findIndex((p) => p.id === Number(id));
    if (productIndex !== -1) {
      const updatedProduct = { id: Number(id), productName, productPrice, productBrand };
      products[productIndex] = updatedProduct;
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  };
  
  
  // Delete product by ID
  exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex((p) => p.id === Number(id));
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  };