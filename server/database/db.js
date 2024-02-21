const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});
const Profile = mongoose.model("Profile", ProfileSchema, "Profiles");

const SleepLogSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  hoursSlept: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    required: true
  }
});
const SleepLog = mongoose.model("SleepLog", SleepLogSchema, "SleepLog");


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
      console.log("MongoDB connection successful.");
    }
  }

  async close(){
    mongoose.connection.close()
    console.log("Database connection closed.");
  }

  async insertProfile({email, password, firstName, lastName}){
    const newProfile = new Profile({"email": email, "password": password, "firstName": firstName, "lastName": lastName});
    newProfile.save();
  }

  async getProfile({email}){
    const profile = Profile.findOne({"email": email});
    return profile;
  }
}

module.exports = DB;