import Product from '../models/productModel.js';
import dotenv from 'dotenv';
import connectDB from '../db/db.js';

dotenv.config({ path: '.env' });

connectDB();

const products = [
    {
      "_id": "692d8e64f8babd6043544d49",
      "name": "helo",
      "price": 123,
      "description": "Product description2",
      "ratings": 0,
      "image": [
        {
          "public_id": "this is test id1",
          "url": "this is url 1",
          "_id": "692d8e64f8babd6043544d4a"
        }
      ],
      "category": "shirt",
      "stock": 1,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-01T12:47:32.970Z",
      "updatedAt": "2025-12-01T12:47:32.970Z",
      "__v": 0
    },
    {
      "_id": "692d9a45b75b74c831a9cbeb",
      "name": "helo",
      "price": 123,
      "description": "Product description2",
      "ratings": 0,
      "image": [
        {
          "public_id": "this is test id1",
          "url": "this is url 1",
          "_id": "692d9a45b75b74c831a9cbec"
        }
      ],
      "category": "shirt",
      "stock": 1,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-01T13:38:13.632Z",
      "updatedAt": "2025-12-01T13:38:13.632Z",
      "__v": 0
    },
    {
      "_id": "692d9a58b75b74c831a9cbee",
      "name": "helo",
      "price": 123,
      "description": "Product description2",
      "ratings": 0,
      "image": [
        {
          "public_id": "this is test id1",
          "url": "this is url 1",
          "_id": "692d9a58b75b74c831a9cbef"
        }
      ],
      "category": "shirt",
      "stock": 1,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-01T13:38:32.891Z",
      "updatedAt": "2025-12-01T13:38:32.891Z",
      "__v": 0
    },
    {
      "_id": "692d9a59b75b74c831a9cbf1",
      "name": "helo",
      "price": 123,
      "description": "Product description2",
      "ratings": 0,
      "image": [
        {
          "public_id": "this is test id1",
          "url": "this is url 1",
          "_id": "692d9a59b75b74c831a9cbf2"
        }
      ],
      "category": "shirt",
      "stock": 1,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-01T13:38:33.772Z",
      "updatedAt": "2025-12-01T13:38:33.772Z",
      "__v": 0
    },
    {
      "_id": "692d9a5ab75b74c831a9cbf4",
      "name": "helo",
      "price": 123,
      "description": "Product description2",
      "ratings": 4.5,
      "image": [
        {
          "public_id": "this is test id1",
          "url": "this is url 1",
          "_id": "692d9a5ab75b74c831a9cbf5"
        }
      ],
      "category": "shirt",
      "stock": 1,
      "numOfReviews": 2,
      "reviews": [
        {
          "user": "69301b1340c517c1cdc4c183",
          "name": "nikiu",
          "rating": 4,
          "comment": "good",
          "_id": "6935766c07c316fca1098f41"
        },
        {
          "user": "69301b1340c517c1cdc4c183",
          "name": "nikiu",
          "rating": 5,
          "comment": "good",
          "_id": "6937b61d88034dd3eb6328c9"
        }
      ],
      "createdAt": "2025-12-01T13:38:34.458Z",
      "updatedAt": "2025-12-09T05:39:41.090Z",
      "__v": 2
    },
    {
      "_id": "692d9a5bb75b74c831a9cbf7",
      "name": "helo",
      "price": 123,
      "description": "Product description2",
      "ratings": 0,
      "image": [
        {
          "public_id": "this is test id1",
          "url": "this is url 1",
          "_id": "692d9a5bb75b74c831a9cbf8"
        }
      ],
      "category": "shirt",
      "stock": 1,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-01T13:38:35.059Z",
      "updatedAt": "2025-12-01T13:38:35.059Z",
      "__v": 0
    },
    {
      "_id": "692d9a5bb75b74c831a9cbfa",
      "name": "helo",
      "price": 123,
      "description": "Product description2",
      "ratings": 0,
      "image": [
        {
          "public_id": "this is test id1",
          "url": "this is url 1",
          "_id": "692d9a5bb75b74c831a9cbfb"
        }
      ],
      "category": "shirt",
      "stock": 1,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-01T13:38:35.999Z",
      "updatedAt": "2025-12-01T13:38:35.999Z",
      "__v": 0
    },
    {
      "_id": "692d9a5cb75b74c831a9cbfd",
      "name": "helo",
      "price": 12.3,
      "description": "Product description2",
      "ratings": 6.5,
      "image": [
        {
          "public_id": "this is test id1",
          "url": "this is url 1",
          "_id": "692d9a5cb75b74c831a9cbfe"
        }
      ],
      "category": "shirt",
      "stock": 1,
      "numOfReviews": 2,
      "reviews": [
        {
          "user": "69301b1340c517c1cdc4c183",
          "name": "nikiu",
          "rating": 5,
          "comment": "bad",
          "_id": "6937b68088034dd3eb6328ce"
        },
        {
          "user": "69301b1340c517c1cdc4c183",
          "name": "nikiu",
          "rating": 8,
          "comment": "good",
          "_id": "6937b6e76892d18b76b28b5f"
        }
      ],
      "createdAt": "2025-12-01T13:38:36.664Z",
      "updatedAt": "2025-12-11T02:19:14.689Z",
      "__v": 3
    },
    {
      "_id": "692ea445d73d62d99e635f66",
      "name": "hello",
      "price": 1234,
      "description": "Product description2",
      "ratings": 0,
      "image": [
        {
          "public_id": "this is test id1",
          "url": "this is url 1",
          "_id": "692ea445d73d62d99e635f67"
        }
      ],
      "category": "shirt",
      "stock": 1,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-02T08:33:09.805Z",
      "updatedAt": "2025-12-02T08:33:09.805Z",
      "__v": 0
    },
    {
      "_id": "692ea580cc61f3fd73d3ac38",
      "name": "heo",
      "price": 1234,
      "description": "Product description2",
      "ratings": 0,
      "image": [
        {
          "public_id": "this is test id1",
          "url": "this is url 1",
          "_id": "692ea580cc61f3fd73d3ac39"
        }
      ],
      "category": "shirt",
      "stock": 1,
      "numOfReviews": 0,
      "reviews": [],
      "createdAt": "2025-12-02T08:38:24.034Z",
      "updatedAt": "2025-12-02T08:38:24.034Z",
      "__v": 0
    }
  ]
const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted');
        await Product.insertMany(products);
        console.log('All Products are added.');
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};
seedProducts();
