const express = require('express');
const UserController = require('../controllers/UserConroller')
const auth=require('../middleware/auth')
const router = express.Router();
router.post('/admin/login', (req, res) => {
    UserController.doAdminLogin(req, res);
})
router.post('/add/user', (req, res) => {
    UserController.addUser(req, res)
})
router.post('/send/otp/for/signup', (req, res) => {
    UserController.sendOtpForSignup(req, res)
})
router.post('/user/login', (req, res) => {
    UserController.doLogin(req, res)
})
router.get('/my/orders', auth, (req, res)=>{
    UserController.getMyOrders(req, res);
})
router.post('/post/comment',auth,(req,res)=>{
    UserController.postComment(req,res);
})
router.get('/admin/reviews',(req,res)=>{
    UserController.getReviewsForAdmin(req,res);
})
module.exports = router