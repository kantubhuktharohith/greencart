import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"
import Order from "../models/Order.js"
import User from "../models/User.js"

// add product : /api/product/add
export const addProduct = async (req, res)=>{
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files
            
        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )
            
        await Product.create({...productData, image: imagesUrl})

        res.json({success: true, message: "Product Added"})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// get product : /api/product/list
export const productList = async (req, res)=>{
    try {
        const products = await Product.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// get  product : /api/product/Id
export const productById = async (req, res)=>{
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.json({success: true, product})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
} 

// change product instock : /api/product/Id
export const changeStock = async (req, res)=>{
    try {
        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, {inStock})
        res.json({success: true, message: "Stock Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// add review to product : /api/product/review
export const addReview = async (req, res)=>{
    try {
        const { productId, rating, comment, userId } = req.body;

        if (!productId || !rating || !comment) {
            return res.json({ success: false, message: "Please provide all review details." });
        }

        // Check if user has purchased the product
        const hasPurchased = await Order.findOne({ 
            userId, 
            "items.product": productId 
        });

        if (!hasPurchased) {
            return res.json({ success: false, message: "You can only review products you have purchased." });
        }

        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!product) {
            return res.json({ success: false, message: "Product not found." });
        }

        const newReview = {
            userId,
            name: user.name,
            rating: Number(rating),
            comment,
        };

        const existingReviewIndex = product.reviews.findIndex(r => r.userId.toString() === userId.toString());

        if (existingReviewIndex !== -1) {
            // Update existing review
            product.reviews[existingReviewIndex] = newReview;
        } else {
            // Add new review
            product.reviews.push(newReview);
        }

        await product.save();
        res.json({ success: true, message: "Review added successfully." });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}