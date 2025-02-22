import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{  // Image URL
        type: String,
        required: true
    },
    category:{
        type: String,
    },
    rating:{
        type: Number,
        default: 0
    },
    numReviews:{
        type: Number,
        default: 0
    },
    countInStock:{
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true    // Add created_at and updated_at fields automatically
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;