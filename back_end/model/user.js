const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   username: { type: String, required: true, index: true },
   password: { type: String, required: true },
   gender: { type: Boolean, default: true },
   role: { type: String, default: 'user' }, // user or administrator
});

module.exports = mongoose.model('User', userSchema);
