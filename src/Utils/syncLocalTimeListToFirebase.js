import { AVAILABLE_TIMES } from "../constants/times";

const syncLocalTimeListToFirebase = (timelist) => {
  let temp = [];
  console.log(temp);
  AVAILABLE_TIMES.forEach((time) => {
    timelist.forEach((bookedTime) => {
        console.log(temp);
      if (
        time.endTime === bookedTime.time.endTime &&
        time.startTime === bookedTime.time.startTime
      ) {
        temp.push({ ...time, status: bookedTime });
    } 
    else {
        console.log(time)
        temp.push(time)
    }
    });
    
  });
  
  return temp;
};

export default syncLocalTimeListToFirebase;


//TODO: Fixa buggen, den funkar på en entry i timelist
//men få fort det är mer bokade tider så läggs dubbletter avv  tomma tider till