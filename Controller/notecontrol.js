const notemodel=require("../Model/note");

//this func will interact with db ,async
const createNote=async(req,res)=>{
    const{title, description}=req.body;
    const newnote = new notemodel({
        Title:title,
        Description:description,
        userID:req.userId
    });

    try {

        await newnote.save();
      res.status(201).json(newnote);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somthing went wrong"});
        
    }


}


const deleteNote=async(req,res)=>{
    const id =req.params.id;
    try {
        const note= await notemodel.findByIdAndRemove(id);
        res.status(202).json(note);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somthing went wrong"});
    }
    
}
const updateNote=async(req,res)=>{
    const id =req.params.id;
    const{title,description}=req.body;
    const newnote= {
   Title: title,
   Description:description,
   userID:req.userId
    };

    try {
        await notemodel.findByIdAndUpdate(id,newnote,{new:true});
        res.status(200).json(newnote);

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somthing went wrong"});
    }
    
}
const getNote=async(req,res)=>{
    try {
        const note=await notemodel.find({userID:req.userId});
        res.status(201).json(note);

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somthing went wrong"});
    }
    
}
module.exports={
    createNote,
    deleteNote,
    updateNote,
    getNote
}