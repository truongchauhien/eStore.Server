import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    unit: String,
    upc: String,
    price: Number,
    // vat: Number,
    // priceVat: Number,
    quantity: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    distributor: {
        type: Schema.Types.ObjectId,
        ref: 'Distributor'
    }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
