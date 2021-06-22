const mongoose=require('mongoose')

const pcSchema = new mongoose.Schema({
    name: String,
    price: Number,
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

const getpcdata = async (pcname)=>{
    const data = await Pc.findOne({name:`${pcname}`});
    return data;
}

module.exports = getpcdata;
