const mongoose = require('mongoose');

const carSchema=mongoose.Schema({
    brand:{type:String,required:true},
    model:{type:Number,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true},
    engineVolume:{type:Number,required:true},
    enginePower:{type:Number,required:true},
    price:{type:Number,required:true},
    stock:{type:Number,required:true},
})


module.exports=mongoose.model('Car',carSchema);