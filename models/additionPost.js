const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const additionPostSchema = new Schema({
    url: String,
    authorID: String,
    type: String,
    dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AdditionPost', additionPostSchema);