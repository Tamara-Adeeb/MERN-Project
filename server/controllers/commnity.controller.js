const {User} = require('../models/user.model');
const {Tochnology} = require('../models/technology.model');
const {Comment} = require('../models/comment.model');
const {Post} = require('../models/post.model');
const { response, request } = require('express');
const crypto = require("crypto");
const ErrorResponse = require('../middleware/error');
const sendEmail = require('../utils/sendEmail');
// const jwtdecode = required("jwt-decode");


// module.exports.createUser = (request,response) => {
//     const {userName,email,password,userRole} = request.body;
//     User.create({
//         userName,
//         email,
//         password,
//         userRole })
//     .then(res => response.json(res))
//     .catch(err => response.json(err))
// }

module.exports.createTochnlogy = (request,response) => {
    const {name} = request.body;
    Tochnology.create({name})
    .then(res => response.json(res))
    .then(err => response.json(err))
}

module.exports.createPost = (request,response) => {
    const {content,projectLink,user,tochnology} = request.body;
    console.log(user)
    console.log(tochnology)
    Post.create({content,projectLink,user,tochnology})
    .then(res => User.findOneAndUpdate({_id:user}, {$push:{post:res._id,activity:{tochnologyId:tochnology}}},{new:true})
        )
    .then(res => {
        console.log(res)
        //update the tochnology
        return Tochnology.findOneAndUpdate({_id:tochnology},{$push:{activity:{userId:user}}},{new:true})
        })
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

module.exports.createComment = (request,response) => {
    const {content,user} = request.body;
    console.log(content)
    console.log(user)
    Comment.create({content,user})
    .then(res => {
        //update user
        console.log(res)
        return User.findOneAndUpdate({_id:user}, {$push:{comment:res._id}},{new:true})
        })
    .then(res => response.json(res))
    .catch(err => response.json(err))
    
}
//***************************************************************************************************** 
//update our database
//When a user follow a tochnology
// module.exports.updateUser = (request,response) => {

//     User.findOneAndUpdate({_id: request.params.id1},{$push:{followedTechnology:request.params.id2,activity:{technologyId:request.params.id2,numAction:1}}})
//     .then(selectedTochnology => {
//         return Tochnology.findOneAndUpdate({_id:request.params.id2}, {$push:{followers:request.params.id1, activity:{userId:request.params.id1,numAction:+1}}},{new:true})
//     })
//     .then(res => response.json(res))
//     .catch(err => response.json(err))
// }
module.exports.updateUser = (request,response) => {
    console.log(request.params.id1)
    console.log(request.params.id2)
    User.findOneAndUpdate({_id: request.params.id1},{$push:{followedTechnology:request.params.id2 ,activity:{technologyId:request.params.id2}}},{new:true})
    .then(selectedTochnology => {
        return Tochnology.findOneAndUpdate({_id:request.params.id2},{$push:{followers:request.params.id1 ,activity:{userId:request.params.id1}}},{new:true})
    })
    .then(res => response.json(res))
    .catch(err => response.json(err))
}
module.exports.updateUserUnFollow = (request,response) => {
    console.log(request.params.id1)
    console.log(request.params.id2)
    User.findOneAndUpdate({_id: request.params.id1},{$pull:{followedTechnology:request.params.id2 ,activity:{technologyId:request.params.id2}}},{new:true})
    .then(selectedTochnology => {
        return Tochnology.findOneAndUpdate({_id:request.params.id2},{$pull:{followers:request.params.id1 ,activity:{userId:request.params.id1}}},{new:true})
    })
    .then(res => response.json(res))
    .catch(err => response.json(err))
}
//***************************************************************************************************** 
//Find all 
//find all tochnolgy that the user follow
module.exports.findAllTech = (request,response) =>{
    Tochnology.find({})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

module.exports.findUser = (request,response) =>{
    User.find({})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

// module.exports.findAllFollwedTech = (request,response) => {
//     const {follower} = request.body;
//     Tochnology.find({followers:{$in:[follower]}})
//     .then(res => response.json(res))
//     .catch(err => response.json(err))
// }
// //find all tochnology not followed by the user
// module.exports.findAllNotFollwedTech = (request,response) => {
//     const {Notfollow} = request.body;
//     Tochnology.find({followers:{$nin:[Notfollow]}})
//     .then(res => response.json(res))
//     .catch(err => response.json(err))
// }

//find all posts
module.exports.findAllPosts = (request,response) => {
    const {user} = request.body;
    Post.find({user:user})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

// find all comments
module.exports.findAllComments = (request,response) => {
    const {user} = request.body;
    Comment.find({user:user})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}
//***************************************************************************************************** 

//Find one Document

module.exports.findOneUser = (request,response) => {
    User.findOne({_id:request.params.id})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

module.exports.findOneTochnology = (request,response) => {
    Tochnology.findOne({_id:request.params.id})
    .then(res => response.json(res))
    .catch(err => response.json(err))
}

//***************************************************************************************************** 
// Delete Documents

module.exports.deleteComment = (request,response) => {
    const {comment,user} = request.body;
    User.updateOne({_id:user},{$pull:{comment:comment}},{multi:false},{new:true})
    .then (res => {
        Comment.deleteOne({_id:comment})
    })
    .then(res => response.json(res))
    .catch(err => response.status(400).json(err))
}

module.exports.deletePost = (request,response) => {
    const{post,user,tochnology} = request.body;
        return User.findOneAndUpdate({_id:user},{$pull:{post:post,activity:{technologyId:tochnology,numAction:1}}},{multi:false}, {new:true})
    .then(res => {
        return Tochnology.findOneAndUpdate({_id:tochnology},{$pull:{activity:{userId:user,numAction:1}}},{multi:false}, {new:true})
    })
    .then(res => {
        return Post.deleteOne({_id:post})
    })
    .then(res => response.json(res))
    .catch(err => response.status(400).json(err))
}

//***************************************************************************************************** 
//LOGIN AND REGISTRATION

//REGISTER

module.exports.createUser = async (request,response) => {
    const {userName,email,password,userRole} = request.body;
    // response.json({sd:"sdsdf"})
    try{
        // response.json({sd:"sdsdfsdff"})
        const user = await User.create({
            userName,
            email,
            password,
            userRole })
            sendToken(user,201,response);
    }
    catch(error) {
        response.status(500).json({err:error})
        };
}

//LOGIN
module.exports.loginUser = async (request,response,next) => {
    const {email, password} = request.body;
    //i can remove success
    if(!email || !password){
        response.status(400).json({success:false,error:"Please provied us with the email and password"})
    }
    try{
        const user = await User.findOne({email}).select("+password");
        if(!user){
            response.status(404).json({success:false,error:"Invalid credentials"})
        }
        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            response.status(404).json({success:false, error: "Invalid credentials"})
        }
        sendToken(user,200,response);
    }
    catch(error){
        response.status(500).json({success:false,error:error.message})
    }
}


//FORGET PASSWORD

module.exports.forgetPassword = async (request,response,next) => {
    const {email} = request.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("Email could not be sent"))
        }
        const resetToken = user.getResetPasswordToken();
        await user.save()
        //frontend server: this is the link that we will send to the client if he forget his password
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please make a put request to the following link:</p>
            <a href=${resetUrl} clicktracking=off>Click Here</a>`;

            try{
                await sendEmail({
                    to: user.email,
                    subject: 'Password Reset Request',
                    text: message
                })
                response.status(200).json({success:true,data:'Email Sent'})
            }
            catch(error){
                console.log(error);

                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;
                await user.save();
                return next(new ErrorResponse("Email could not be sent", 500));
            }
    }catch(error){
        next(error); 
    }
}

module.exports.resetPassword = async (request,response,next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(request.params.restToken).digest("hex");
    //here we are looking for the user that have the same token in the url
    try {
        const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
        });
    
        if (!user) {
            return next(new ErrorResponse("Invalid Token", 400));
        }
    
        user.password = request.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save();
    
        res.status(201).json({
        success: true,
        data: "Password Updated Success",
        token: user.getSignedJwtToken(),
        });
    } catch (error) {
        next(error);
    }
}


const sendToken = (user,statusCode,response) => {
    const token = user.getSignedToken();
    response.status(statusCode).json({success:true,token},user)
}







