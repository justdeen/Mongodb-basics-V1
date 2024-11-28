// =============== CONNECTING TO MONGOOSE =============== 
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/productapp')
.then(() => {
    console.log('CONNECTION OPEN')
})
.catch(err => {
    console.log('CONNECTION ERROR')
    console.log(err)
})

// ----------------- SCHEMA ------------------
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: [String],
    quantity: {
        online: Number,
        inStore: Number
    }
})  

// ----------------- CUSTOM METHODS FOR INSTANCES AND THE MODEL ------------------
productSchema.methods.priceChange = function(){
    this.price = 750;
    return this.save();
}

productSchema.statics.nameChange = function(){
    return this.updateOne({name: 'mount'}, {name: 'dirt bike'});
}

// ----------------- VIRTUAL SCHEMA PROPERTIES ------------------
productSchema.virtual('checkout').get(function () {
    return `Product name: ${this.name}, Product price: ${this.price}`
})

// ----------------- MONGOOSE MIDDLEWARE ------------------
productSchema.pre('save', async function () {
    this.name = 'bmx'
    this.price = 1000
    console.log('SAVING...')
})
productSchema.post('save', async function () {
    console.log('SAVED.')
})

// ----------------- SETTING UP THE MODEL ------------------
const Product = mongoose.model('Product', productSchema)

Product.find({}).then(data => console.log(data))


// =============== DB QUERIES & MONGOOSE SYNTAX (NO DB QUERY) ===============
// ----------------- MONGOOSE VIRTUALS IN ACTION ------------------
// const newBike = new Product({name: 'mountain', price: 250})
// console.log(newBike)
// console.log(newBike.checkout)

// ----------------- MONGOOSE MIDDLEWARE IN ACTION ------------------
// const sportBike = new Product({name: 'mountain', price: 250})
// sportBike.save().then((data) => console.log(data))

// const productDetails = Product.findOne({name: 'dirt bike'})
// console.log(productDetails)

// ----------------- INSTANCE OF THE MODEL SAVED TO MONGODB ------------------ 
// const bike = new Product({name: 'mount', price: 500, category: ['new', 'black'], quantity: {online: 4, inStore: 3}})
// bike.save()
// .then((data) => console.log(data))
// .catch((err) => console.log('ERROR OCCURED'))

// ----------------- CUSTOM INSTANCE METHODS ------------------ 
// const findProduct = async () => {
//     const foundProduct = await Product.findOne({name: 'mount'});
//     console.log(foundProduct);
//     await foundProduct.priceChange();
//     console.log(foundProduct);
// }

// findProduct();

// ----------------- CUSTOM MODEL METHODS ------------------ 
// Product.nameChange().then(res => console.log(res))