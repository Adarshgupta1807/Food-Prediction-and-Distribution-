const donationModel = require("../models/Donation");

/**
 * @name createDonation
 * @description Restaurant creates a new donation listing
 * @access Private (restaurant)
 */
async function createDonation(req, res) {
    const { foodName, quantity, pickupTime } = req.body;

    if (!foodName || quantity == null) {
        return res.status(400).json({ message: "foodName and quantity are required" });
    }

    const donation = new donationModel({
        restaurantId: req.user.id,
        foodName,
        quantity,
        pickupTime,
        status: "available"
    });

    await donation.save();

    res.status(201).json({
        message: "Donation created successfully",
        donation
    });
}

/**
 * @name getDonations
 * @description NGO sees available donations + its own accepted ones, Restaurant sees its own donations
 * @access Private (restaurant or volunteer/NGO)
 */
async function getDonations(req, res) {
    let filter = {};

    if (req.user.role === "volunteer") {
        // Available donations + jo is NGO ne already accept ki hain
        filter = {
            $or: [
                { status: "available" },
                { ngoId: req.user.id }
            ]
        };
    } else if (req.user.role === "restaurant") {
        filter = { restaurantId: req.user.id };
    }

    const donations = await donationModel
        .find(filter)
        .populate("restaurantId", "username")
        .populate("ngoId", "username");

    res.status(200).json({
        message: "Donations fetched successfully",
        donations
    });
}

/**
 * @name acceptDonation
 * @description NGO accepts an available donation
 * @access Private (volunteer/NGO)
 */
async function acceptDonation(req, res) {
    const { id } = req.params;

    const donation = await donationModel.findById(id);

    if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
    }

    if (donation.status !== "available") {
        return res.status(400).json({ message: "Donation is not available for acceptance" });
    }

    donation.ngoId = req.user.id;
    donation.status = "accepted";

    await donation.save();

    res.status(200).json({
        message: "Donation accepted successfully",
        donation
    });
}

/**
 * @name updateDonationStatus
 * @description Update donation status (accepted -> picked_up -> delivered)
 * @access Private (volunteer/NGO who accepted it)
 */
async function updateDonationStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["accepted", "picked_up", "delivered"];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    const donation = await donationModel.findById(id);

    if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
    }

    // Ownership check — sirf wahi NGO update kar sake jisne accept kiya
    if (!donation.ngoId || donation.ngoId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Forbidden: Not your donation" });
    }

    donation.status = status;
    await donation.save();

    res.status(200).json({
        message: "Donation status updated successfully",
        donation
    });
}

module.exports = { createDonation, getDonations, acceptDonation, updateDonationStatus };