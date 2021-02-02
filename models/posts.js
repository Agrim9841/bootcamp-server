const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    title: String,
    authorID: String,
    content: String,
    type: String,
    dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Posts', postsSchema);