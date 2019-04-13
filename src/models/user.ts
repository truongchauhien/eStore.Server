import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

});

const User = mongoose.model('User', userSchema);

export default User;
