const mongoose = require('mongoose')

const mongodbUrl = process.env.MONGOBDB_URL

mongoose.connect(mongodbUrl, {
    // useNewUrlParser: true, // This option is still needed
    // Remove newUnifiedTopology option
})

const db = mongoose.connection

db.on("connected", () => {
    console.log("database server is connected");
})

db.on("disconnected", () => {
    console.log("database server is disconnected");
})
db.on("error", () => {
    console.log("database server has error");
})

// Export the database connection
module.exports = db
