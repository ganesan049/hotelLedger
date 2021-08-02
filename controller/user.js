const Users = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
        api_key: process.env.EMAIL_KEY,
        },
    })
);

/**
 * @route   POST api/user/signup
 * @desc    POST add user
 * @access  Private
 */

exports.signUp = async (req, res) => {
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            let err = new Error("All Fields are mandatory");
            return res.status(400).json({
                message: err.message,
              });
        }
        Users.findOne({email})
        .then((userExist) => {
            if(userExist){
                return res.status(401).json({
                    message: "User is already found please sign in"
                })
            }
            bcrypt
            .hash(password,12)
            .then(hashPwd => {
                const user = new Users({name,email,password:hashPwd});
                user.save()
                .then(userSaved => {
                    transporter.sendMail({
                        to:userSaved.email,
                        from: "dummy@gmail.com",
                        subject:"Signup success for Hotel Ledger",
                        text: `${userSaved.name} saved successfully contine sing in`,
                        html: "<strong>and easy to do anywhere, even with Node.js</strong>",                        
                    }).then(output => console.log(output));
                    res.status(200).json({
                        message:`${userSaved.name} saved successfully continue sign in`
                    })
                })
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
};

/**
 * @route   POST api/user/signin
 * @desc    POST verify user
 * @access  Private
 */

exports.signIn = async (req,res) => {
    console.log("executed",req.body)
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "All Fields are mandatory",
              });
        }
        Users.findOne({email})
        .then(user =>{
            if(!user){
                return res.status(422).json({
                    message: "User NA signup",
                  });
            }
            bcrypt.compare(password,user.password)
            .then(doMatch => {
                if(!doMatch){
                    return res.status(400).json({
                        message: "Invalid email Id or password",
                      });
                }
                const jwtToken = jwt.sign({_id:user._id},process.env.JWT_SECRETKEY)
                const token = `Bearer ${jwtToken}`;
                return res.status(200).json({
                    token,
                    user
                });
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
}

/**
 * @route   POST api/user/resetPassword
 * @desc    Reset Password
 * @access  Private
 */

exports.resetPassword = async (req,res) => {
    const path = "http://localhost:5000";

    try {
        crypto.randomBytes(32, (err,buffer) => {
            if(err){
                console.error(err);
            }
            const {email} = req.body;
            if(!email){
                let err = new Error("All Fields are mandatory");
                return res.status(400).json({
                    message: err.message,
                  });
            }
            const token = buffer.toString("hex");
            Users.findOne({email})
            .then(user =>{
                if(!user){
                    return res.status(422).json({
                        message: "User NA signup",
                      });
                }
                user.resetToken = token;
                user.expireToken = new Date(Date.now() + (60*60*1000*24));
                user.save()
                .then(userSaved => {
                    console.log(userSaved, "userSaved")
                    transporter.sendMail({
                        to: email,
                        from: 'ganesanece49@gmail.com',
                        subject: "Reset Password",
                        html: `
                      <p>You requested for password reset</p>
                      <h5>click in This <a href="${path}/api/user/reset/${token}">Link</a></h5>
                      `
                      },(err,info) => {
                          if(err){
                              console.error(err);
                          }
                          console.log(info);
                      });
                      res.status(200).json({
                        message: "check your mail"
                      })
                })
            })
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
}

/**
 * @route   POST api/user/reset/:token
 * @desc    Reset Password
 * @access  Private
 */

exports.resetToken = async (req,res) => {

    try {
        
        const resetToken = req.params.token;
        const {password} = req.body;
    
        Users.findOne({resetToken,expireToken:{$gt:new Date()}})
        .then(user => {
            if(!user){
                return res.status(422).json({
                    message: "Try again session expired"
                })
            }
            bcrypt.hash(password,12)
            .then(hashPwd => {
                user.password = hashPwd;
                user.resetToken = undefined;
                user.expireTime = undefined;
                user.save().then(savedUser => {
                    res.status(200).json({
                        message: "pwd reset successfully",
                        savedUser
                      })
                })
            })
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error:`error occured ${error}`
        })
    }
}