const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    price: { type: Number, default: 1 }
});

module.exports = mongoose.model('Receipt', orderSchema);