const mongoose=require('mongoose')

const pcSchema = new mongoose.Schema({
    title: String,
    discountprice: Number,
    processor: String,
    storage:String,
    gpu: String,
    motherboard: String,
    ram: String,
    powersupply: String,
    dimensions: String,
    description: String,
    img: String
});
const Pc = mongoose.model('Pc',pcSchema,'pc');





module.exports = Pc;
