const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    available: { type: String, required: true }
});

module.exports = mongoose.model('Inventory', inventorySchema);
