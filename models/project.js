const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
   name: String,
   authorID: String,
   description: String,
   repoUrl: String,
   demoUrl: String,
   dateAdded: { type: Date, default: Date.now },
   tools: [ String ],
   collaboratorsID: [ String ],
});

module.exports = mongoose.model('Project', projectSchema);