const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    authorID: String,
    parentID: String,
    dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', likeSchema);