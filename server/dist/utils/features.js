import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const dbConnect = await mongoose.connect("mongodb://localhost:27017", {
            dbName: "TscEcom",
        });
        if (dbConnect) {
            console.log(`Database connected successfully ${dbConnect.connection.host}`);
        }
    }
    catch (err) {
        console.log("Issue in connecting with database");
    }
};
