const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: String,
    authorID: String,
    description: String,
    url: String,
    dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', blogSchema);