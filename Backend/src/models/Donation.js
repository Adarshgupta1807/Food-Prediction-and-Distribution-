const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    foodName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "accepted", "picked_up", "delivered"],
        default: "available"
    },
    pickupTime: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model("Donation", donationSchema);