import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    cashier: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    totalAmount: Number,
    items: [{
        name: String,
        price: Number,
        priceVat: Number,
        vat: Number,
        unit: String,
        quantity: Number
    }],
    createdAt: Date
});

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
