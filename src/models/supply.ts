import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplySchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number,
    totalAmount: Number,
    requestedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    requestedDate: {
        type: Date,
        default: Date.now
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    approvedDate: Date,
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    deliveryDate: Date,
    isReceived: {
        type: Boolean,
        default: false
    },
    receivedDate: Date,
    receivedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }
});

const SupplyModel = mongoose.model('supply', SupplySchema);
export default SupplyModel;
