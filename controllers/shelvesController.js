const Products = require('../models/Products');

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
