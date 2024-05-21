    import User from "../model/userModel.js";

export const create= async (req,res)=>{

    try {
           
const userData= new User(req.body);

  if(!userData){

  return res.status(404).json({msg: "data not found"});
  }
 const saveData= await userData.save();

      res.status(200).json(saveData);
      
    } catch (error) {
        res.status(500).json({error:error});
    }

}


export const getAll= async(req,res)=>{
    try {
        const userData=await User.find();
        if(!userData){
            return res.status(404).json({msg:"user data not found "})
        }

        res.status(200).json(userData);
        } catch (error) {
        res.status(500).json({error:error});
    }
}

export const getOne= async(req,res)=>{
    try {
        const id=req.params.id;
        const userExist= await User.findById(id);

        if(!userExist){
            return res.status(404).json({msg:"user  not found "})
        }

        res.status(200).json(userExist);
        } catch (error) {
        res.status(500).json({error:error});
    }
}

export const update= async(req,res)=>{
    try {
        const id= req.params.id;
        const userExist= await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"user not found"})
        }
          const updateData= await User.findByIdAndUpdate(id, req.body, {new:true});
          res.status(200).json({msg:"user data updated successfully"});
    } catch (error) {
        res.status(500).json({error:error});
    }
}

// export const deleted= async(req,res)=>{
//     try {
//         const id= req.params.id;
//         const userExist= await User.findById(id);
//         if(!userExist){
//             return res.status(401).json({msg:"user not found"})
//         }
//            await User.findByIdAndDelete(id);
//           res.status(200).json({msg: "user has been deleted"});
//     } catch (error) {
//         res.status(500).json({error:error});
//     }
//}

export const deleted = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "User not found" });
        }
        await User.findByIdAndDelete(id);
        const updatedUsers = await User.find(); // Get updated user list
        res.status(200).json({ msg: "User has been deleted", users: updatedUsers });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};