import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    requester: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    requestDate: Date,
    isApproved: {
        type: Boolean,
        default: false
    },
    approvedDate: Date,
    approver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isReceived: {
        type: Boolean,
        default: false
    },
    receivedDate: Date,
    checker: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number,
    totalAmount: Number
});

const RequestModel = mongoose.model('Request', RequestSchema);
export default RequestModel
