const mongoose = require('mongoose');


const mongdb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Easy4You', { useNewUrlParser: true });
        console.log("Connection done with MongoDB!");

        const UserHistory = await mongoose.connection.db.collection('userhistories');
        const DriverHistory = await mongoose.connection.db.collection('driverhistories');

       
        const data = await UserHistory.find({}).toArray();
        global.userhistories = data;
        const data1 = await DriverHistory.find({}).toArray();
        global.driverhistories = data1;
      

    } catch (err) {
        console.error("Connection to MongoDB failed:", err);
    }
};
module.exports = mongdb;