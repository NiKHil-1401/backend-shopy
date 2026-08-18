import express from 'express';
import {createProduct, createReviewForProduct, deleteProduct, deleteReview, getAdminProducts, getAllProduct, getReviewsForProduct, getSingleProduct, updateProduct} from '../controller/productController.js';
import { verifyUserAuth,roleBasedAccess } from '../utils/userAuth.js';

const router = express.Router();

router.route('/products')
.get(getAllProduct)


router.route('/admin/products')
.get(getAdminProducts);

router.route('/admin/product/create')
.post(verifyUserAuth,roleBasedAccess("admin"),createProduct)

router.route('/Admin/product/:id')
.put(verifyUserAuth,roleBasedAccess("admin"),updateProduct)
.delete(verifyUserAuth,roleBasedAccess("admin"),deleteProduct);

router.route('/product/:id')
.get(verifyUserAuth,getSingleProduct)

router.route("/review").put(verifyUserAuth,createReviewForProduct)
router.route("/reviews").get(getReviewsForProduct).delete(verifyUserAuth,deleteReview)



export default router;