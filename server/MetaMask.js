const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MetaMaskSchema = new Schema({
    email: String,
    role: Number,
    acid: String
});

module.exports = model('MetaMask', MetaMaskSchema);