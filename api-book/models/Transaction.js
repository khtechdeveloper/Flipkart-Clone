const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, default: '' },
    email: { type: String, required: true },
    mobNo: { type: String, default: '' },
    addressLine1: {type:String,default: ''},
    addressLine2: {type:String,default: ''},
    city: {type: String,default: ''},
    state: {type: String,default: ''},
    country: {type: String,default: ''},
    zipCode: {type: String,default: ''},
    status: { type: String, default: 'Pending', enum: ['Pending', 'Completed','Rejected'] },
    transactionId: {type: String, default: ''},
    totalPrice: {type: Number, default:0},
    paymentGateway: { type: String, default:'Stripe',enum: ['Stripe','RazorPay']},
    products: {type: JSON, default: []},

    createdAt: Date,
    updatedAt: Date,

})
transactionSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Transaction', transactionSchema);