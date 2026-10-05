const { Router } = require('express');
const predictionController = require('../controllers/predictionController');
const { authMiddleware, restrictTo } = require('../middlewares/authMiddleware');

const predictionRouter = Router();

predictionRouter.get('/', authMiddleware, restrictTo('restaurant'), predictionController.predictConsumption);

module.exports = predictionRouter;