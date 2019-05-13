import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
    startDate: Date,
    endDate: Date,
    workShifts: {
        monday: {
            start: {
                type: String,
                default: ''
            },
            end: {
                type: String,
                default: ''
            }
        },
        tuesday: {
            start: {
                type: String,
                default: ''
            },
            end: {
                type: String,
                default: ''
            }
        },
        wednesday: {
            start: {
                type: String,
                default: ''
            },
            end: {
                type: String,
                default: ''
            }
        },
        thursday: {
            start: {
                type: String,
                default: ''
            },
            end: {
                type: String,
                default: ''
            }
        },
        friday: {
            start: {
                type: String,
                default: ''
            },
            end: {
                type: String,
                default: ''
            }
        },
        saturday: {
            start: {
                type: String,
                default: ''
            },
            end: {
                type: String,
                default: ''
            }
        },
        sunday: {
            start: {
                type: String,
                default: ''
            },
            end: {
                type: String,
                default: ''
            }
        }
    },
    isWorking: {
        type: Boolean,
        default: true,
    }
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);
export default EmployeeModel;
