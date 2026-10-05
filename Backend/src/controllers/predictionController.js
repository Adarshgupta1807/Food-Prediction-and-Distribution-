const predictionService = require("../services/predictionService");

/**
 * @name predictConsumption
 * @description Get prediction for logged-in restaurant based on last 7 records
 * @access Private (restaurant)
 */
async function predictConsumption(req, res) {
    const prediction = await predictionService.getPrediction(req.user.id);

    res.status(200).json(prediction);
}

module.exports = { predictConsumption };