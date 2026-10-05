const foodRecordModel = require("../models/FoodRecord");

/**
 * @name registerFood
 * @description Register a food record (Restaurant only)
 * @access Private (restaurant)
 */
async function registerFood(req, res) {
    const { foodName, cookedQty, consumedQty } = req.body;

    if (!foodName || cookedQty == null || consumedQty == null) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (consumedQty > cookedQty) {
        return res.status(400).json({ message: "Consumed quantity cannot exceed cooked quantity" });
    }

    const wasteQty = cookedQty - consumedQty;

    const foodRecord = new foodRecordModel({
        restaurantId: req.user.id, // token se milta hai, body se nahi
        foodName,
        cookedQty,
        consumedQty,
        wasteQty
    });

    await foodRecord.save();

    res.status(201).json({
        message: "Food record added successfully",
        record: foodRecord
    });
}

/**
 * @name getMyRecords
 * @description Get all food records for the logged-in restaurant
 * @access Private (restaurant)
 */
async function getMyRecords(req, res) {
    const records = await foodRecordModel.find({ restaurantId: req.user.id });

    res.status(200).json({
        message: "Records fetched successfully",
        records
    });
}
/**
 * @name updateFood
 * @description Update a food record (only if it belongs to the logged-in restaurant)
 * @access Private (restaurant)
 */
async function updateFood(req, res) {
    const { id } = req.params;
    const { foodName, cookedQty, consumedQty } = req.body;

    const record = await foodRecordModel.findById(id);

    if (!record) {
        return res.status(404).json({ message: "Record not found" });
    }

    // Ownership check — koi dusre restaurant ka record edit na kar sake
    if (record.restaurantId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden: Not your record" });
    }

    if (foodName != null) record.foodName = foodName;
    if (cookedQty != null) record.cookedQty = cookedQty;
    if (consumedQty != null) record.consumedQty = consumedQty;

    if (record.consumedQty > record.cookedQty) {
        return res.status(400).json({ message: "Consumed quantity cannot exceed cooked quantity" });
    }

    // wasteQty dobara calculate karo, kyunki quantities change ho sakti hain
    record.wasteQty = record.cookedQty - record.consumedQty;

    await record.save();

    res.status(200).json({
        message: "Record updated successfully",
        record
    });
}

/**
 * @name deleteFood
 * @description Delete a food record (only if it belongs to the logged-in restaurant)
 * @access Private (restaurant)
 */
async function deleteFood(req, res) {
    const { id } = req.params;

    const record = await foodRecordModel.findById(id);

    if (!record) {
        return res.status(404).json({ message: "Record not found" });
    }

    if (record.restaurantId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden: Not your record" });
    }

    await foodRecordModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Record deleted successfully"
    });
}

/**
 * @name getFoodStats
 * @description Get aggregated dashboard stats for the logged-in restaurant
 * @access Private (restaurant)
 */
async function getFoodStats(req, res) {
    const mongoose = require("mongoose");

    const stats = await foodRecordModel.aggregate([
        {
            $match: { restaurantId: new mongoose.Types.ObjectId(req.user.id) }
        },
        {
            $group: {
                _id: null,
                totalCooked: { $sum: "$cookedQty" },
                totalConsumed: { $sum: "$consumedQty" },
                totalWaste: { $sum: "$wasteQty" }
            }
        }
    ]);

    // agar koi record hi nahi hai to defaults bhej do
    const result = stats[0] || { totalCooked: 0, totalConsumed: 0, totalWaste: 0 };

    res.status(200).json({
        totalCooked: result.totalCooked,
        totalConsumed: result.totalConsumed,
        totalWaste: result.totalWaste
    });
}

module.exports = { registerFood, getMyRecords, updateFood, deleteFood, getFoodStats };
