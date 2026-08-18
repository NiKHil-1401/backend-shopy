import Product from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import APIFUNCTIONALITY from "../utils/apiFunctionality.js";

// =============================
// Create Product
// =============================
export const createProduct = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  // Duplicate check
  const productExists = await Product.findOne({ name });
  if (productExists) {
    return next(new ErrorHandler("Product already exists", 400));
  }

  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

// =============================
// Update Product
// =============================
export const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

// =============================
// Get Single Product
// =============================
export const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// =============================
// Get All Products (Search + Filter + Pagination)
// =============================
export const getAllProduct = catchAsyncError(async (req, res, next) => {

  const resultPerPage = 10; // You can change

  // Step 1 → Search + Filter (WITHOUT PAGINATION)
  const apiFeature = new APIFUNCTIONALITY(Product.find(), req.query)
    .search()
    .filter();

  // Count filtered products
  const filteredProductsWithoutPagination = await apiFeature.query.clone();
  const filteredProductsCount = filteredProductsWithoutPagination.length;

  // Step 2 → Apply Pagination
  apiFeature.pagination(resultPerPage);

  const products = await apiFeature.query;

  console.log(products);

  // Even if products is empty, 200 response is okay
  res.status(200).json({
    success: true,
    totalProducts: await Product.countDocuments(),
    filteredProductsCount,
    resultPerPage,
    totalPages: Math.ceil(filteredProductsCount / resultPerPage),
    products,
  });
});

// =============================
// Delete Product
// =============================
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

export const getAdminProducts = catchAsyncError(async (req, res, next) => {
   const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
})

export const createReviewForProduct = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  // 1. Validate rating input
  if (rating < 0 || rating > 5) {
    return next(new ErrorHandler("Rating must be between 0 and 5", 400));
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  // 2. Check if reviewed already
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    // Update OLD review
    isReviewed.rating = rating;
    isReviewed.comment = comment;
  } else {
    // Add NEW review
    product.reviews.push(review);
  }

  // 3. Update total reviews count
  product.numOfReviews = product.reviews.length;

  // 4. Recalculate average rating
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings =
    product.reviews.length > 0 ? avg / product.reviews.length : 0;

  // 5. Save product
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review added successfully",
  });
});

export const getReviewsForProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  product.reviews.sort((a, b) => b.createdAt - a.createdAt);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

export const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if(!product) { 
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = reviews.length > 0 ? avg / reviews.length : 0;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews: reviews.length,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });

})
