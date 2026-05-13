import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    userId: { type: String, ref: 'user', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: {type: Array, required: true},
    price: {type: Number, required: true },
    offerPrice: {type: Number, required: true },
    image: {type: Array, required: true },
    category: {type: String, required: true },
    inStock: {type: Boolean, default: true },
    reviews: [reviewSchema],
}, { timestamps: true})

const Product = mongoose.models.product || mongoose.model('product', productSchema)

export default Product