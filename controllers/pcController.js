const getpcdata = require('../models/Pc');


exports.getpc = async (req,res)=>{
    const data = await getpcdata(req.params.name);
    if(data)
    {
        res.status(200).render('pcdetails',{data:data});
        return
    }
    res.status(200).render('pcdetails',{data:{name:'BIG ERROR'}});
}
