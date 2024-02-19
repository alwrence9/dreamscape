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

    const emailPattern = /^([A-z]|[0-9]|\.)+@[a-z]+(\.[a-z]+)+$/g;
    
    if(!email.match(emailPattern)){
      throw new Error("Invalid email.")
    }

    if(password, firstName, lastName){
      const newProfile = new Profile({"email": email, "password": password, "firstName": firstName, "lastName": lastName});
      newProfile.save();
    }
    else{
      throw new Error("Invalid fields for profile.")
    }
  }

  async getProfile({email, password}){
    const profile = Profile.findOne({"email": email, "password": password});
    return profile;
  }
}

module.exports = DB;