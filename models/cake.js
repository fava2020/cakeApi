const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cakeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: false
  },
  flavors: {
    type: [String],
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cake', cakeSchema);