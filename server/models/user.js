const mongoose=require("mongoose")


const UserSchema=new mongoose.Schema({
    name:String,
    email:{type:String,unique:true,sparse:true},
    password:String
})

const UserModel=mongoose.model('User',UserSchema)

module.exports=UserModel