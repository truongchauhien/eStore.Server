import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    password: String,
    refreshToken: String,
    roles: [{
        type: String,
        enum: ['cashier', 'stockClerk', 'manager', 'systemAdmin']
    }],
    lastLogin: Date,
    fullName: String,
    birthday: Date,
    idNumber: String,
    phoneNumber: String,
    position: {
        type: String,
        enum: ['Thu ngân', 'Kiểm hàng', 'Quản lí']
    },
    address: String,
    salary: Number,
    allowance: Number,
    startDate: Date,
    endDate: Date,
    isWorking: {
        type: Boolean,
        default: true,
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
});

const User = mongoose.model('User', userSchema, 'users');
export default User;
