const {Router} = require('express');
const authController = require('../controllers/authController');
const authRouter = Router();
//const authMiddleware=require('../middlewares/auth.middleware')
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user based on role (volunteer or restaurant)
 * @access Public
 */
authRouter.post('/login', authController.loginUser);

module.exports = authRouter;