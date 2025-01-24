const cron = require('node-cron');
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb+srv://guusvrv:tmtldCEk4mv5oUuC@setdb.fonny.mongodb.net/SETDB?retryWrites=true&w=majority&appName=SETDB";
const client = new MongoClient(uri);

async function resetReachCount() {
    try {
        await client.connect();
        const database = client.db('SETDB');
        const buyers = database.collection('buyers');
        const sellers = database.collection('sellers');

        // Update all users' reachCount to 5
        const resultBuyers = await buyers.updateMany({}, { $set: { reachCount: 5 } });
        const resultSellers = await sellers.updateMany({}, { $set: { reachCount: 5 } });
        console.log(`Reset reachCount for ${resultBuyers.modifiedCount} buyers and ${resultSellers.modifiedCount} sellers`);
    } catch (error) {
        console.error("Error resetting reachCount:", error);
    } finally {
        await client.close();
    }
}

// RESETS EVERY SUNDAY AT MIDNIGHT
cron.schedule('0 0 * * 0', () => {
    console.log("Running weekly reachCount reset...");
    resetReachCount();
});
