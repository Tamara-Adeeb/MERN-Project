const mongoose = require('mongoose');

const TochnologySchema = new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String},
    followers:[{type:mongoose.Types.ObjectId, ref:'User'}],
    about:{type:String},
    activity:[{userId:String,numAction:{type:Number,default:0},_id: false},{_id : false}]
},{ timestamps: true });

module.exports.Tochnology = mongoose.model('Tochnology', TochnologySchema);