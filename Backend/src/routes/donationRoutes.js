const { Router } = require('express');
const donationController = require('../controllers/donationController');
const { authMiddleware, restrictTo } = require('../middlewares/authMiddleware');

const donationRouter = Router();

donationRouter.post('/', authMiddleware, restrictTo('restaurant'), donationController.createDonation);

donationRouter.get('/', authMiddleware, restrictTo('restaurant', 'volunteer'), donationController.getDonations);

donationRouter.patch('/:id/accept', authMiddleware, restrictTo('volunteer'), donationController.acceptDonation);

donationRouter.patch('/:id/status', authMiddleware, restrictTo('volunteer'), donationController.updateDonationStatus);

module.exports = donationRouter;