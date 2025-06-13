const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  hasVoted: { type: Boolean, default: false }
});

// userSchema.pre('save', async function () {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model('User', userSchema);
