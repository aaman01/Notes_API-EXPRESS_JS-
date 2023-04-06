const jwt= require("jsonwebtoken");
const Secret_key=process.env.SECRET_KEY;
const auth=(req,res,next)=>{

    try {
        let token= req.headers.authorization;
        if(token){
            token= token.split(" ")[1];
            //ddecrypt using secret key
            let user= jwt.verify(token,Secret_key);
            req.userId=user.id;
        }
        else{
             return res.status(401).json({message:"Unauthorized User"});
        }
        next();
        
    } catch (error) {
     console.log(error);
        res.status(401).json({message:"Unauthorized User(error)"});
    }
}
module.exports=auth;