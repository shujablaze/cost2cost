const Product = require('../models/Product');
const Pc = require('../models/Pc')
const multer = require('multer')
const fs = require('fs/promises')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split('.').pop()
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    },
})

const filterFiles = (req,file,cb)=>{
    const allowed = ['jpg','jpeg','png']
    const extension = file.originalname.split('.').pop().toLowerCase()
    const mimetype = file.mimetype.split('/')[1]

    if(allowed.indexOf(extension) !== -1 && allowed.indexOf(mimetype) !== -1){
        return cb(null,true)
    }
    else{
        return cb('Only Images are allowed',false)
    }
}

exports.upload = multer({ 
    storage: storage,limit:{fileSize:100000 },fileFilter:filterFiles
})

exports.createProduct = async (req,res,next) => {
    try{
        const data = req.body
        data.img = req.file.filename
        
        const newProduct = await Product.create(data)

        res.status('201').json({
            status: 'ok',
            data : newProduct
        })

    }catch(err){
        next(err)
    }
}

exports.getCategoryProducts = async (req,res,next) => {
    try{
        const {category} = req.params

        const productList = await Product.find({category})

        res.status(200).render('shelves',{
            category:category,
            data : productList
        });
        return;

    }catch(err){
        next(err)
    }
}

exports.getProduct = async (req,res,next) => {
    try{
        const {category,id} = req.params

        const product = await Product.findById(id)

        res.status(200).render('product',{
            category,
            data:product
        }) 

    }catch(err){
        next(err)
    }
}

exports.updateProduct = async (req,res,next) => {
    try{
        const {id} = req.body
        const {data} = req.body

        const updatedProduct = await Product.findByIdAndUpdate(id,data,{new : true})

        res.status('200').json({
            status : 'ok',
            data : updatedProduct
        })

    }catch(err){
        next(err)
    }
}

exports.deleteProduct = async(req,res,next) => {
    try{
        const {id} = req.body;

        const deletedProduct = await Product.findByIdAndDelete(id)
        const {img} = deletedProduct

        try{
            await fs.rm(`./public/img/${img}`)

        }catch(err){
            console.log("FileName : ",img)
            console.log(err)
        }
        
        res.status('204').json({
            status: 'ok'
        })

    }catch(err){
        next(err)
    }
}


/*
exports.getProducts=async (req,res)=>{
    const category = req.params.category;
    let id={}
    let isProduct=false
    if(req.params.id)
    {   id={_id:req.params.id}
        isProduct=true
    }

    let data = undefined;
    
    if(category === "gamingchairs")
        data = await Products.getchairdata(id);
    else if(category === "cpu")
        data = await Products.getCpuData(id);
    else if(category === "gpu")
        data = await Products.getGpuData(id);
    else if (category === "ram")
        data = await Products.getRamData(id);
    else if (category === "motherboard")
        data = await Products.getMotherboardData(id);
    else if (category === "accessories")
        data = await Products.getAccessoriesData(id)

    if(!isProduct){
        res.status(200).render('shelves',{
            category:category,
            data
        });
        return;
    }
    res.status(200).render('product',{
        category,
        data:data[0]
    }) 
}

const getPcById = async (id)=>{
    const data = await Pc.findById(id)
    return data
}


exports.getItem = async (category,id)=>{

    let data=undefined
    if(category === "gamingchairs")
    data = await Products.getchairdata(id);
    else if(category === "cpu")
    data = await Products.getCpuData(id);
    else if(category === "gpu")
    data = await Products.getGpuData(id);
    else if (category === "ram")
    data = await Products.getRamData(id);
    else if (category === "motherboard")
    data = await Products.getMotherboardData(id)
    else if (category === "accessories")
    data = await Products.getAccessoriesData(id)
    else if (category === "pc"){
        data = await getPcById(id)
        return data
    }
    
    return data[0]
}
*/

