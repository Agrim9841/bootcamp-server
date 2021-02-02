const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    authorID: String,
    parentID: String,
    content: String,
    dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', commentSchema);