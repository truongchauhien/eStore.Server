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
                type: String
            },
            end: {
                type: String
            }
        },
        tuesday: {
            start: {
                type: String
            },
            end: {
                type: String
            }
        },
        wednesday: {
            start: {
                type: String
            },
            end: {
                type: String
            }
        },
        thursday: {
            start: {
                type: String
            },
            end: {
                type: String
            }
        },
        friday: {
            start: {
                type: String
            },
            end: {
                type: String
            }
        },
        saturday: {
            start: {
                type: String
            },
            end: {
                type: String
            }
        },
        sunday: {
            start: {
                type: String
            },
            end: {
                type: String
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
