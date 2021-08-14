const crypto = require("crypto");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    userName : {type:String,required:true,trim:true,minLength:[2,"user name should be 2 or more char"]},
    email:{type:String,required:true,trim:true,unique:true,match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
        ]},
    password:{type:String,required:true,trim:true,minLength:[8,"password should be 8 or more char"],select:false},
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    followedTechnology:[{type:mongoose.Types.ObjectId, ref:'Technology'}],
    userRole:{type:String,enum:["recruter","user"],required:true},
    company:{type:String},
    post:[{type:mongoose.Types.ObjectId, ref:'Post'}],
    comment:[{type:mongoose.Types.ObjectId, ref:'Comment'}],
    activity:[{technologyId:String,numAction:{type:Number,default:0},_id: false},{ _id:false}]
},{ timestamps: true });

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
}
)

UserSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.getSignedToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,});
}

UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    //sha256 is type of alogrithem 
    this.getResetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    return resetToken;
}



module.exports.User = mongoose.model('User',UserSchema);