require("dotenv").config()
const { default: mongoose } = require("mongoose")
const connectDB = require("../config/db")
const User = require("../models/User")

async function connect(){
    try{
        await connectDB()
        console.log("Database connection succssfully")

        const createdUser = await User.create({
                name:"Test ",
                email: "testuser@example.com",
                password: "temporary_test_password"
            })
        console.log("User created", createdUser)
        const foundUser = await User.findOne({
            email: "testuser@example.com"
        });
        console.log("Retrieved user:", foundUser);

    }catch(error){
        console.error("Test failed",error.message)
    }finally{
        await mongoose.disconnect()
        console.log("Database connection closed")
    }
}

connect()