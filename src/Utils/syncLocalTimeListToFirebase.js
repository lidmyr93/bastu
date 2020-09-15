import { AVAILABLE_TIMES } from "../constants/times";

const syncLocalTimeListToFirebase = (timelist) => {
  let temp = [];
  let x = 0;
  
  AVAILABLE_TIMES.forEach((time) => {
    if (timelist[x] && timelist[x].time.startTime === time.startTime) {
      temp.push({ ...time, status: timelist[x] });
      x += 1;
    } else {
      temp.push(time);
    }
  });
  return temp;
};

export default syncLocalTimeListToFirebase;


//TODO: Look over for a more optimal solution, alternative move this
//to a firebase function for cleaner frontend