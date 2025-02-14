import mongoose from "mongoose";

let isConnected = false; // Keeps track of whether the connection has already been made

export async function connect() {
    try {
        const dbUri = process.env.MONGODB_URI;
        
        if (!dbUri) {
            throw new Error("MongoDB URI is undefined. Please check your environment variables.");
        }

        if (isConnected) {
            console.log("Using existing database connection");
            return;
        }

        // Establish connection to the database
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Mark the connection as established
        isConnected = true;

        // Only add event listeners once
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.error("Error connecting to the database", err);
            process.exit(1); // Gracefully exit the process on error
        });

    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit if connection fails
    }
}
