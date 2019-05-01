import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DistributorSchema = new Schema({
    name: String,
    phoneNumber: String,
    address: String
});

const DistributorModel = mongoose.model('Distributor', DistributorSchema);
export default DistributorModel;
