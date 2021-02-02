const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
   name: String,
   email: String,
   degree: String,
   graduated: { type: Boolean, default: false },
   admin: { type: Boolean, default: false },
   skills: [ String ],
   hobbies: [ String ],
   collaborationsID: [ String ],
   dateJoined: { type: Date, default: Date.now },
   dateGraduated: { type: Date, default: null },
});

module.exports = mongoose.model('Member', memberSchema);