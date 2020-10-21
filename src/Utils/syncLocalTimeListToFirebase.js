import { AVAILABLE_TIMES } from "../constants/times";

const syncLocalTimeListToFirebase = async (timelist) => {
  let temp = [];

  AVAILABLE_TIMES.forEach((item) => {
    let skip = false;
    timelist.forEach((time) => {
      if (time.time.startTime === item.startTime) {
        skip = true;
        return temp.push({ ...item, status: time });
      }
    });
    return skip ? null : temp.push(item);
  });

  return temp;
};

export default syncLocalTimeListToFirebase;

//TODO: Look over for a more optimal solution, alternative move this
//to a firebase function for cleaner frontend
// Oneway could be to create all times in firebase when user changes to
// a date that hasn´t been visited yet
