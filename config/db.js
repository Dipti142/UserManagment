
 const mongoose = require('mongoose');

//function for mongodb conncetion

 const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Db error",error);
        process.exit(1);
    }
}


module.exports=connectDb