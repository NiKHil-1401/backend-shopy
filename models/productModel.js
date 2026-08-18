import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true,'Product price is required'],
      maxLength: [7,'Price cannot exceed 7 characters'],
    },
    description: {
      type: String,
      required: [true,'Product description is required'],
    },
    ratings:{
        type: Number,
        default: 0,
    },
    image: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }],
    category: {
        type: String,
        required: [true,'Product category is required'],
    },
    stock: {
        type: Number,
        required: [true,'Product stock is required'],
        maxLength: [4,'Stock cannot exceed 4 characters'],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true,
            },
            name:{
                type: String,
                required: true,
            },
            rating:{
                type: Number,
                maxLength: [5,'Rating cannot exceed 5 characters'],
                required: true,
            },
            comment:{
                type: String,
                required: true,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product