const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    available: { type: String, required: true }
});

module.exports = mongoose.model('Inventory', inventorySchema);
