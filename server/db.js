const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
mongoose.connect(process.env.DB_URL, {
    autoIndex: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected to ' + dbUrl);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose is disconnected through app termination');
        process.exit(0);
    });
});
