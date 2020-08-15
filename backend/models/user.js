const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Projects'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
