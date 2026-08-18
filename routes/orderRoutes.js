import express from "express";
import {
  verifyUserAuth,
  roleBasedAccess,
} from "../utils/userAuth.js";
import {
  allMyOrders,
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} from "../controller/orderController.js";

const router = express.Router();

// USER ROUTES
router.route("/new/order").post(verifyUserAuth, createNewOrder);
router.route("/orders/user").get(verifyUserAuth, allMyOrders);

// User getting a single order by ID
router.route("/order/:id").get(verifyUserAuth, getSingleOrder);

// ADMIN ROUTES
router
  .route("/admin/order/:id")
  .put(verifyUserAuth, roleBasedAccess("admin"), updateOrder)
  .get(verifyUserAuth, roleBasedAccess("admin"), getSingleOrder)
  .delete(verifyUserAuth, roleBasedAccess("admin"), deleteOrder);
router
  .route("/admin/orders")
  .get(verifyUserAuth, roleBasedAccess("admin"), getAllOrders);

export default router;
