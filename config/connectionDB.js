const mongoose = require("mongoose")

exports.connectDB=async()=>
{
    mongoose.connect(process.env.MONGO_CONNECTION_URL)
    .then(()=>
    {
        console.log("Database Connected !!!")
    })
    .catch((err)=>
    {
        console.log("Error connecting:",err)
    })
}

