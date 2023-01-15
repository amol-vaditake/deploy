const mongoose = require('mongoose');

const { Schema } = mongoose;
const roleSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  // roles can be same/different for different teams , keeping required false because not using teams right now
  team: {
    type: String,
    required: false,
  },
});

const Role = mongoose.model('role', roleSchema);
module.exports = Role;
