const mongoose = require('mongoose');

class DB{
  constructor(){
    if (!DB.instance){

      this.db = null;
      DB.instance = this;

    }
    return DB.instance;
  }

  async connect(dbUrl){
    if (!this.db){
      try{
        await mongoose.connect(dbUrl);
      }
      catch(e){
        console.log(`Connection failed: ${e.message}`);
        throw new Error("Failed to connect to db.")
      }
      this.db = mongoose.connection;
      console.log("MongoDB connection successful");
    }
  }

  async close(){
    mongoose.connection.close()
    console.log("Database connection closed.");
  }
}

module.exports =  DB;