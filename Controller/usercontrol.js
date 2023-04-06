const usermodel=require("../Model/user");
const bcrypt=require("bcrypt");
const jwt= require("jsonwebtoken");

const Secret_key=process.env.SECRET_KEY ;

const signup= async(req, res)=>{
    const {username, email,password}=req.body;
    try
    {
        //exisiting user check
        const existinguser = await usermodel.findOne({email:email});

        if(existinguser){
            return res.status(400).json({
                message:"User already exists"
            });
        }
        //hashed password
        const hashedpassword=await bcrypt.hash(password,10);

        //User creation
        const result= await usermodel.create({
            email:email,
            username:username,
            password:hashedpassword
        });

        // token creation
       const token = jwt.sign({
        email: result.email,
        id:result._id
       },Secret_key);
         
   res.status(200).json({user:result,token:token});


    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }

    
    


}
const signin=async(req,res)=>{
    const{email, password}=req.body;

    try{
         //exisiting user check
         const existinguser = await usermodel.findOne({email:email});

         if(!existinguser){
             return res.status(404).json({
                 message:"User not found"
             });
         }
         // pass match
         const matchpass=  await bcrypt.compare(password,existinguser.password)
         if(!matchpass)
         {
           return res.status(400).json({message:"Invalid Credentials"});
         }

           // token creation, emcryption uisng secret key
       const token = jwt.sign({
        email: existinguser.email,
        id:existinguser._id
       },Secret_key);

       res.status(201).json({user:existinguser,token:token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }

}

module.exports={signup,signin};

