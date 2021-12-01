const Mongoose= require( 'mongoose');

const productSchema = new Mongoose.Schema({
    name:String,
    price:String,
    quantity:String,
    category:String
})
const Product = new Mongoose.model("Product",productSchema)


module.exports=Product;