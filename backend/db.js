const mongoose = require('mongoose');

let dbConnection;
const mongoURI='mongodb://localhost:27017/cakestore'
module .exports={connectToDb:(cb)=>{
    mongoose.connect(mongoURI)
    .then(() => {
        return cb()
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Could not connect to MongoDB', err);
        return cb(err)
    });
}, getDb:()=>dbConnection}