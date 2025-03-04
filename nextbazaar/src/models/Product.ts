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
    offerPrice:{
        type: Number,
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: [String],
        required: true
    },
    category:{
        type: [String],
        enum: ['electronics', 'beauty', 'books', 'clothing', 'shoes', 'sports', 'outdoor', 'home', 'kitchen', 'grocery', 'health', 'toys', 'automotive', 'industrial', 'handmade', 'audio', 'other'],
        required: true
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
    timestamps: true    
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;