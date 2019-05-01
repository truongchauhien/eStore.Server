import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String
});

const CategoryModel = mongoose.model('Category', CategorySchema);
export default CategoryModel;
