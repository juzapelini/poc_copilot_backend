const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullName: String,
  nickname: String,
  roles: [String],
  phone: String,
  email: { type: String, unique: true },
  password: String,
});

// Hash a senha antes de salvar o usuário
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;