const {Router} = require('express');
const foodController = require('../controllers/foodController');
const foodRouter = Router();
const { authMiddleware, restrictTo } = require('../middlewares/authMiddleware');
//const authMiddleware=require('../middlewares/auth.middleware')
/**
 * @route POST /api/food
 * @desc Register a new food item
 * @access Public
 */
foodRouter.post('/', authMiddleware, restrictTo('restaurant'),foodController.registerFood);

foodRouter.get('/', authMiddleware, restrictTo('restaurant'), foodController.getMyRecords);

// IMPORTANT: /stats route /:id route se pehle likha hai
foodRouter.get('/stats', authMiddleware, restrictTo('restaurant'), foodController.getFoodStats);

foodRouter.put('/:id', authMiddleware, restrictTo('restaurant'), foodController.updateFood);
foodRouter.delete('/:id', authMiddleware, restrictTo('restaurant'), foodController.deleteFood);

module.exports = foodRouter;