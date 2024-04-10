/* eslint-disable no-undef */
const mongoose = require('mongoose');

const ChronotypeQuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  choices: {
      lion: {
        type: String,
        required: true
      },
      dolphin: {
        type: String,
        required: true
      },
      bear: {
        type: String,
        required: true
      },
      wolf: {
        type: String,
        required: true
      }
  }
});
const ChronotypeQuestion = mongoose.model("ChronotypeQuestion", ChronotypeQuestionSchema, "ChronotypeQuestions");

const InsomniaQuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  choices: {
      episodic: {
        type: String,
        required: true
      },
      persistent: {
        type: String,
        required: true
      },
      recurrent: {
        type: String,
        required: true
      }       
  }
});
const InsomniaQuestion = mongoose.model("InsomniaQuestion", InsomniaQuestionSchema, "InsomniaQuestions");

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
  },
  picture: {
    type: String,
    required: false
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

const TarotSchema = mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  number:{
    type:Number,
    required:true
  },
  arcana:{
    type:String,
    required:true
  },
  suit:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  image:{
    type:String
  }
});
const TarotCard = mongoose.model("TarotCard", TarotSchema, "TarotCard");

const SPDschema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dangerLVL: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coordinates: {
    type: String,
    required: true
  }
});
const SPD = mongoose.model("SPDdirectory", SPDschema, "SPDdirectory");

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
    await mongoose.connection.close()
    console.log("Database connection closed.");
  }

  //Inserts profile into database
  async insertProfile({email, password, firstName, lastName}){
    const newProfile = new Profile({"email": email, "password": password, "firstName": firstName, "lastName": lastName});
    newProfile.save();
  }

  //Gets a profile based on the email. Email should be unique.
  async getProfile(email){
    const profile = Profile.findOne({"email": email});
    return profile;
  }

  async clearProfiles(){
    const results = await Profile.deleteMany({"email": { $regex: /.*/}});
    console.log(`Deleted ${results.deletedCount} profiles`);
  }



  //Inserts dream journal entry into database
  async insertDreamJournal({email, date, title, description}){
    const newDreamJournal = new DreamJournal({"email": email, "date": date, "title": title, "description": description});
    newDreamJournal.save();
  }

  //Gets dream journal entries based on the email. Email should be unique.
  async getDreamJournals(email){
    const dreamJournalEntries = DreamJournal.find({"email": email});
    return dreamJournalEntries;
  }
  //Clear all dream log entries
  async clearJournals(){
  const results = await DreamJournal.deleteMany({"email": { $regex: /.*/}});
  console.log(`Deleted ${results.deletedCount} journal entries`);
  }




  //Inserts dream journal entry into database
  async insertSleepLog({email, date, hoursSlept, notes}){
    const newSleepLog = new SleepLog({"email": email, "date": date, "hoursSlept": hoursSlept, "notes": notes});
    newSleepLog.save();
  }

  //Gets sleep log entries based on the email. Email should be unique.
  async getSleepLogs(email){
    const sleepLogEntries = SleepLog.find({"email": email});
    return sleepLogEntries;
  }
  //Clear all sleep log entries
  async clearSleepLogs(){
  const results = await SleepLog.deleteMany({"email": { $regex: /.*/}});
  console.log(`Deleted ${results.deletedCount} sleep log entries`);
  }




  //Inserts chronotype question into database
  async insertChronotypeQuestion({question, lion, dolphin, bear, wolf}){
    const newQuestion = new ChronotypeQuestion({"question": question, "choices": {"lion": lion, "dolphin": dolphin, "bear": bear, "wolf": wolf} });
    newQuestion.save();
  }

  //Gets chronotype questions
  async getChronotypeQuestion(){
    const questions = ChronotypeQuestion.find({"question": { $regex: /.*/}});
    return questions;
  }

  //Clear all chronotype questions
  async clearChronotypeQuestion(){
  const results = await ChronotypeQuestion.deleteMany({"question": { $regex: /.*/}});
  console.log(`Deleted ${results.deletedCount} chronotype questions`);
  }



  //Inserts insomnia question into database
  async insertInsomniaQuestion({question, episodic, persistent, recurrent}){
    const newQuestion = new InsomniaQuestion({"question": question, "choices": {"episodic": episodic, "persistent": persistent, "recurrent": recurrent} });
    newQuestion.save();
  }


  async getRandomChronotypeQuestion(numQuestions) {
    numQuestions = parseInt(numQuestions) || 0;
    const questions = await ChronotypeQuestion.aggregate([{ $sample: { size: numQuestions } }]);
    return questions;
  }

  //Gets insomnia questions
  async getInsomniaQuestion(){
  const questions = InsomniaQuestion.find({"question": { $regex: /.*/}});
  return questions;
  }

  async getRandomInsomniaQuestion(numQuestions) {
    numQuestions = parseInt(numQuestions) || 0;
    const questions = await InsomniaQuestion.aggregate([{ $sample: { size: numQuestions } }]);
    return questions;
  }

  //Clear all insomnia questions
  async clearInsomniaQuestion(){
  const results = await InsomniaQuestion.deleteMany({"question": { $regex: /.*/}});
  console.log(`Deleted ${results.deletedCount} insomnia questions`);
  }



  //Inserts tarot card into database
  async insertTarotCard({name, number, arcana, suit, description, image}){
    const newTarot = new TarotCard({"name": name, "number": number, "arcana": arcana, "suit": suit, "description": description, "image": image });
    newTarot.save();
  }

  //Gets tarot cards
  async getTarotCards(){
  const cards = TarotCard.find({"name": { $regex: /.*/}});
  return cards;
  }

  async getRandomTarotCard(){
  const cards = TarotCard.aggregate().sample(1);
  return cards;
  }

  //Clear all tarot cards
  async clearTarotCards(){
  const results = await TarotCard.deleteMany({"name": { $regex: /.*/}});
  console.log(`Deleted ${results.deletedCount} Tarot cards`);
  }



  //Inserts and SPD into the database
  async insertSPD({name, dangerLVL, description, coordinates}){
    const newSPD = new SPD({"name": name, "dangerLVL": dangerLVL, "description": description, "coordinates": coordinates});
    newSPD.save();
  }

  //Gets all SPD entries
  async getAllSPD(){
  const results = SPD.find({"name": { $regex: /.*/}});
  return results;
  }

  //Gets SPD entries
  async getSPD(id){
  const results = SPD.find({"_id": id});
  return results;
  }

  //Clear all SPD entries
  async clearSPD(){
  const results = await SPD.deleteMany({"name": { $regex: /.*/}});
  console.log(`Deleted ${results.deletedCount} SPD entries`);
  }

  async insertImage(email, image) {
      await Profile.findOneAndUpdate(
          { email: email }, // find a document with that filter
          { picture: image }, // document to insert when nothing was found
          { upsert: true, new: true, runValidators: true } // options
      );
  }
}

module.exports = DB;