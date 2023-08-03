const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  dummyData,
} = require("../controller/ProductController");
const validateProduct = require("../middleware/ProductData");
const { verifyToken } = require("../middleware/UserMiddleware");
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/products", verifyToken, createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/dummyData", dummyData);

module.exports = router;
