const Admin = require('../models/Admin')
const User = require('../models/User')
const Transaction=require('../models/Transaction')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const Review=require('../models/Review')
const mongoose=require('mongoose')
async function doAdminLogin(req, res) {
    try {
        console.log(req.body)
        let user = await Admin.findOne({ email: req.body.email })
        if (!user) {
            res.status(500).send({ success: false, message: 'Invalid User Name/password' });
        } else {
            if (user.password === req.body.password) {
                user.lastLogin = new Date();
                await user.save();

                res.status(200).send({ success: true, message: 'Login Success' })
            } else {
                res.status(500).send({ success: false, message: 'Invalid User Name/password' });
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: 'Something Went Wrong...' });
    }
}
async function 
addUser(req, res) {
    try {
        console.log(req.body);
        let existsUser = await User.findOne({ email: req.body.email });
        if (existsUser) {
            res.status(500).send({ success: false, message: 'User Already Exists' })
        } else {
            let user = new User(req.body);
            let encryptredPassword = bcrypt.hashSync(req.body.password, 10);
            user.password = encryptredPassword;
            await user.save();
            let msg = "Dear " + req.body.firstName + ", your account has been created on our plateform. Now you can explore our services.Your user name is your mail id. Thanks"
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'itsonucomputer@gmail.com',
                    pass: 'xhvq vfsa kiba ffes'
                }
            })
            let mailOptions = {
                from: 'itsonucomputer@gmail.com',
                to: req.body.email,
                subject: 'Regading your Account Creation on Book store',
                text: msg
            }
            transporter.sendMail(mailOptions, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ success: false })
                } else {
                    res.status(200).send({ success: true })
                }
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false })
    }

}
async function sendOtpForSignup(req, res) {
    try {
        console.log(req.body, 'req.body for otp')
        let otp = Math.floor(Math.random() * 9000) + 1000;
        console.log(otp, 'otp')
        let msg = "Dear User, one time password for email verfication is." + otp;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'itsonucomputer@gmail.com',
                pass: 'xhvq vfsa kiba ffes'
            }
        })
        let mailOptions = {
            from: 'itsonucomputer@gmail.com',
            to: req.body.email,
            subject: 'Regading OTP foy your email verifiaction',
            text: msg
        }
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ success: false })
            } else {
                res.status(200).send({ success: true, data: otp })
            }
        })
    } catch (err) {
        res.status(500).send({ success: false })
        console.log(err);
    }
}
async function doLogin(req, res) {
    try {
        console.log(req.body, 'req.body')
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(500).send({ success: false, message: 'Inavalid Email/Password' })
        } else {
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                user.lastLogin = new Date();
                await user.save();
                let secret_key = 'b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU';
                let token = jwt.sign({ _id: user._id, email: user.email,name: user.firstName }, secret_key, { expiresIn: '1hr' });
                let data = {
                    name: user.firstName,
                    email: user.email,
                    token: token
                }
                res.status(200).send({ success: true, data: data })
            } else {
                res.status(500).send({ success: false, message: 'Invalid UserName/password' })
            }
        }
    } catch (err) {
        console.log(err)
    }
}
async function getMyOrders(req, res) {
    try{
        console.log('we are here to fetch user specific user transactions..')
        console.log(req.user, 'user...')
        let userEmail = req.user.email
        console.log(userEmail)
        let transactions = await Transaction.find({email:userEmail});
        console.log(transactions)
        res.status(200).send({success: true, data: transactions})

    }catch(err){
        res.status(500).send({success: false, message:"somethig went wrong!"})
    }
}
async function postComment(req,res) {
    try{
        console.log(req.user,'user')
        console.log(req.body,'body')
        let review=new Review()
        review.userEmail=req.user.email;
        review.userName=req.user.name;
        review.book=(req.body.book)
        review.comment=req.body.comment;
        review.rating=req.body.rating
        await review.save();
        console.log(review,'review')
        res.status(200).send({success: true})
       
    }catch(err){
        console.log('eror',err)
        res.status(500).send({success: false, message:"somethig went wrong!"})
    }
}
async function getReviewsForAdmin(req,res) {
    try{
        let review=await Review.find({});
        console.log(review,'review')
        res.status(200).send({success: true,data:review})
    }catch(err){
         res.status(500).send({success: false, message:"somethig went wrong!"})
    }
}
module.exports = {
    doAdminLogin,
    addUser,
    sendOtpForSignup,
    doLogin,
    getMyOrders,
    postComment,
    getReviewsForAdmin
}