const Pc = require('../models/Pc');

const createPc = async (req,res,next) => {
    try{
        const pc = await Pc.create(req.body)

        res.status('201').json({
            status : 'ok',
            data : pc
        })
        
    }catch(err){
        next(err)
    }
}

const getpcdata = async (pcname)=>{
    const data = await Pc.findOne({title:`${pcname}`});
    return data;
}


exports.getpc = async (req,res)=>{
    const data = await getpcdata(req.params.name);

    if(data)
    {
        res.status(200).render('pcdetails',{data:data});
        return
    }
    res.status(200).render('pcdetails',{data:{name:'BIG ERROR'}});
}


