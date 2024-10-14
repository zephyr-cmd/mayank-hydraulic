const mongoose = require("mongoose");
let { db_User, db_pass, NODE_ENV } = process.env;
let DBName = NODE_ENV === "production" ? "development" : "development";
export const DB_URL = `mongodb+srv://mayank:rohit1@cluster0.terms.mongodb.net/${DBName}?retryWrites=true&w=majority`;

let connection = {};

export async function DBConnect() {
  if (connection.isConnected) {
    console.log(`Already connected to the :"${NODE_ENV}" database`);
    return;
  }
  try {
    if (!connection.isConnected) {
      // Attempt to connect to the database
      const db = await mongoose.connect(DB_URL || "", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
      });
      connection.isConnected = db.connections[0].readyState;
      console.log(`New "${NODE_ENV}" database connection created successfully`);
    } else {
      console.log(` "${NODE_ENV}" Database connection already exists`);
    }
  } catch (error) {
    console.error(`L-23DB, ${NODE_ENV} DB connection Failed :`, error);
    // Graceful exit in case of a connection error
    // process.exit(1);
  }
}
