const Mongoose= require( 'mongoose');
//user schema
const userSchema = new Mongoose.Schema({
    name:String,
    email:String,
    password:String,
    place:String
})
const User = new Mongoose.model("User",userSchema)




//productschma



module.exports=User;
