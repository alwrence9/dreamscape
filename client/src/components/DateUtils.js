export default class DateUtilities{

  dayMiliseconds = 24 * 60 * 60 * 1000;

  dateMidnight(date = new Date()){
    return new Date(`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`);
  }

  getStartOfNextWeek(date = new Date()){
    const daysFromMonday = date.getDay() >= 2 ? 8 - date.getDay() : 1 - date.getDay();
    const monday = new Date(date.getTime() + (daysFromMonday * dayMiliseconds) );
    return monday.getTime();
  }

  dateInputToObject(string){
    const date = new Date(string);
    return new Date(`${date.getMonth() + 1}-${date.getDate() + 1}-${date.getFullYear()}`);
  }

  dateToDatabaseStorage(date = new Date()){
    date = dateMidnight(date);
    const string = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

    return {"dateString": string, "dateSinceEpoch": date.getTime()}
  }

}