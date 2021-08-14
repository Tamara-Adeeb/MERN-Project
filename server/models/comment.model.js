const mongoose = require('mongoose');


const CommentSchema = new mongoose.Schema({
    content:{type:String,required:true,trim:true},
    user:{type:mongoose.Types.ObjectId, ref:'User'}
},{ timestamps: true });

module.exports.Comment = mongoose.model('Comment', CommentSchema);