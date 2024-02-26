const mongoose = require('mongoose');

//Structure for profile
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

//Structure for sleep log entry
const SleepLogSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  date: {
    string: {
      type: String,
      required: true
    },
    sinceEpoch: {
      type: Number,
      required: true
    }
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

//Structure for dream journal entry
const DreamSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  date: {
    string: {
      type: String,
      required: true
    },
    sinceEpoch: {
      type: Number,
      required: true
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
const DreamJournal = mongoose.model("DreamJournal", DreamSchema, "DreamJournal");

class DB{
  constructor(){
    if (!DB.instance){
      this.db = null;
      DB.instance = this;

    }
    return DB.instance;
  }

  //Connect to DB.
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

  //Closes connection to DB
  async close(){
    mongoose.connection.close()
    console.log("Database connection closed.");
  }

  //Inserts profile into database
  async insertProfile({email, password, firstName, lastName}){
    const newProfile = new Profile({"email": email, "password": password, "firstName": firstName, "lastName": lastName});
    newProfile.save();
  }

  //Gets a profile based on the email. Email should be unique.
  async getProfile({email}){
    const profile = Profile.findOne({"email": email});
    return profile;
  }
}

module.exports = DB;