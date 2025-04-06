const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB Connected ...');
            console.log('Connection successful..!');
        }).catch(err => {
            console.error(err);
            process.exit(1);
        });
}

module.exports = connectDB;