const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    genre: { type: String, required: true },
    descr: { type: String, required: true },
    year: { type: Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);
