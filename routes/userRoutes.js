const router=require('express').Router();
const {loginUser,registerUser,getMe}=require('../controllers/userController')
const verifyToken=require('../middlewares/authMiddleware')


router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/me',verifyToken,getMe);


module.exports=router