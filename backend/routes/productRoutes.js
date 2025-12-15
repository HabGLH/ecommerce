// //product routes.js
import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  enableProduct,
} from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts); // Public Route
router.get("/admin", authenticateToken, roleMiddleware(), getAdminProducts); // Admin Route
router.get("/:id", getProductById); // Public Route

// Admin Routes
router.post("/", authenticateToken, roleMiddleware(), createProduct);
router.put("/:id", authenticateToken, roleMiddleware(), updateProduct);

router.delete("/:id", authenticateToken, roleMiddleware(), deleteProduct);
router.put("/:id/enable", authenticateToken, roleMiddleware(), enableProduct);

export default router;
