const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    comment: { type: String, required: true },
    rating: { type: Number },
    deliveryCharges: { type: Number, default: 0 },
    status: { type: String, default: 'Active', enum: ['Active', 'InActive'] },
    createdAt: Date,
    updatedAt: Date,
})
reviewSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Review', reviewSchema);