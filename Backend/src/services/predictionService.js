const { GoogleGenAI, Type } = require("@google/genai");
const foodRecordModel = require("../models/FoodRecord");

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const predictionResponseSchema = {
    type: Type.OBJECT,
    properties: {
        predictedConsumption: {
            type: Type.NUMBER,
            description: "Predicted quantity of food that will be consumed on the next day, based on past consumption trends"
        },
        recommendedCooking: {
            type: Type.NUMBER,
            description: "Recommended quantity of food to cook next day, slightly higher than predicted consumption to avoid shortage while minimizing waste"
        },
        expectedWaste: {
            type: Type.NUMBER,
            description: "Expected waste quantity, calculated as recommendedCooking minus predictedConsumption"
        },
        reasoning: {
            type: Type.STRING,
            description: "A short one or two sentence explanation of the trend observed in the data and why this prediction was made"
        }
    },
    required: ["predictedConsumption", "recommendedCooking", "expectedWaste", "reasoning"]
};

/**
 * @name getPrediction
 * @description Predict next day's cooking/consumption using Gemini based on last 7 records
 */
async function getPrediction(restaurantId) {
    const records = await foodRecordModel
        .find({ restaurantId })
        .sort({ createdAt: -1 })
        .limit(7);

    if (records.length === 0) {
        return {
            predictedConsumption: 0,
            recommendedCooking: 0,
            expectedWaste: 0,
            reasoning: "No past records available to make a prediction."
        };
    }

    // Data ko simple readable format mein convert karo, oldest se newest
    const historyData = records
        .reverse()
        .map((record, index) => 
            `Day ${index + 1}: cooked=${record.cookedQty}, consumed=${record.consumedQty}, waste=${record.wasteQty}`
        )
        .join("\n");

    const prompt = `You are a food demand prediction assistant for a restaurant that donates surplus food.
Analyze the following last ${records.length} days of food records and predict tomorrow's numbers.

${historyData}

Based on the trend in this data (increasing, decreasing, or stable), predict:
1. predictedConsumption - expected quantity to be consumed tomorrow
2. recommendedCooking - how much should be cooked tomorrow (should cover predicted consumption with a small safety margin, while minimizing waste)
3. expectedWaste - recommendedCooking minus predictedConsumption
4. reasoning - a short explanation of the trend you observed

Respond strictly according to the provided JSON schema. Do not include any fields other than those defined in the schema.`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: predictionResponseSchema,
        }
    });

    return JSON.parse(response.text);
}

module.exports = { getPrediction };