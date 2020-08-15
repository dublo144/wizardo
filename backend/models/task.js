const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  created: {
    type: Date,
    required: true
  },
  deadline: {
    type: Date
  },
  completed: {
    type: Boolean,
    required: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
});

module.exports = mongoose.model('Task', taskSchema);
