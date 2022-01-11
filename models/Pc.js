const mongoose=require('mongoose')
const Product = require('./Product')

const Pc = Product.discriminator('Pc',new mongoose.Schema({
    processor: String,
    storage: String,
    gpu: String,
    motherboard: String,
    ram: String,
    powersupply: String,
    dimensions: String,
}))

module.exports = Pc;
