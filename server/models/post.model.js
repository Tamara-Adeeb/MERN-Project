const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    content:{type:String,required:true,trim:true},
    projectLink:{type:String},
    user:{type:mongoose.Types.ObjectId, ref:'User'},
    tochnology:{type:mongoose.Types.ObjectId, ref:'Technology'}
},{ timestamps: true });

module.exports.Post = mongoose.model('Post', PostSchema);