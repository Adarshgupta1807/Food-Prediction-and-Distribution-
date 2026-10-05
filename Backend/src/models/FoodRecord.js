const mongoose = require("mongoose");

const foodRecordSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    cookedQty: {
        type: Number,
        required: true
    },
    consumedQty: {
        type: Number,
        required: true
    },
    wasteQty: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const foodRecordModel = mongoose.model("FoodRecord", foodRecordSchema);

module.exports = foodRecordModel;