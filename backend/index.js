const express =require("express") ;
const cors =require ("cors");
const dotenv=require( "dotenv");
const connectDb=require ("./config/db.js");
const  Mongoose =require("mongoose");
const User=require( "./model/userModel.js");
const Product=require( "./model/productModel.js");
var ObjectId = Mongoose.Types.ObjectId;
const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

dotenv.config();
connectDb();
// test API
// app.get('/',(req,res)=>{
//     res.send("api is running")
// })



//login Api
app.post("/login",(req,res)=>{

    const{email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
if(password===user.password){
    res.send({message:"Login Successfull",user:user})
}else{
    res.send({message:"Password didn't match"})
}
        }else{
            res.send({message:"User not Registered"})
        }
    })



})

//Register API

app.post("/register",(req,res)=>{
    const{name,email,password,place}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"User already registerd"})
        }
        else{
            const user=new User({
                name,
                email,
                password,
                place
            })
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"Successfully registered,Please Login"})
                }
            })
        }
    })



    })

//Add products
app.post("/addproducts",(req,res)=>{
    const{name,price,quantity,category}=req.body
   
  
        {
            const product=new Product({
                _id:new Mongoose.Types.ObjectId,
                name,price,quantity,category
            })
            product.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"Product added successfully"})
                }
            })
        }
    



    })
//ListProducts
app.get("/listproducts",(async(req,res)=>{
Product.find({},function(err,users){
    if(err){
       res.send(err)   
    }else{
     res.send(users);
     console.log(users)
    }
})
}))

const PORT=process.env.PORT||5000

app.listen(PORT,console.log(`server started on PORT ${PORT}`));