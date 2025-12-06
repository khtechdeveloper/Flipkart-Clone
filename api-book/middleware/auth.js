const jwt= require('jsonwebtoken');
const auth= (req, res, next)=>{
    try{
        const authHeader=req.headers["authorization"];
        const token= authHeader && authHeader.split(' ')[1];
        console.log(token,  'token');
        let secret_key='b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU';
        const decoded=jwt.verify(token, secret_key)
        console.log(decoded, 'decoded...')
        req.user=decoded;
        next();
    }catch(err){
        res.status(500).send({success: false})
    }
}
module.exports=auth