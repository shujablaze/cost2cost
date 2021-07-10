const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:String,
    description:String,
    features:String,
    img:String,
    discountprice:Number,
    originalprice:Number
});

const Chair = mongoose.model('Chair',productSchema,'gamingchairs');
const Ram   = mongoose.model('Ram',productSchema,'ram');
const Cpu   = mongoose.model('Cpu',productSchema,'cpu');
const Gpu   = mongoose.model('Ram',productSchema,'gpu');
const Motherboard = mongoose.model('Motherboard',productSchema,'motherboard');
const Accessories = mongoose.model('Ram',productSchema,'accessories');


exports.getchairdata = async (products)=>{
    const data = await Chair.find(products);
    return data;
}

exports.getCpuData = async (products)=>{
    const data = await Cpu.find(products);
    return data;
}

exports.getGpuData = async (products)=>{
    const data = await Gpu.find(products);
    return data;
}
exports.getRamData = async (products)=>{
    const data = await Ram.find(products);
    return data;
}
exports.getMotherboardData = async (products)=>{
    const data = await Motherboard.find(products);
    return data;
}
exports.getAccessoriesData = async (products)=>{
    const data = await Accessories.find(products);
    return data;
};