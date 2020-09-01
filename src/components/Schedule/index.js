import React, { useEffect, useState } from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

const ScheduleBase = ({ firebase, syncedDate }) => {
  const [scheduelList, setScheduleList] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSchedule = () => {
    console.log("called");
    setLoading(true);
    if (syncedDate) {
      firebase.times(syncedDate).on("value", (snapshot) => {
        const timesObject = snapshot.val();
        if (!timesObject) return setScheduleList(null);
        const timesList = Object.keys(timesObject).map((key) => ({
          ...timesObject[key],
          bookedBy: key,
        }));
        console.log(timesList);
        setScheduleList(timesList);
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    getSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncedDate]);
  return (
    <div>
      {!loading && scheduelList && (
        <div>
          {/* item.bookedBy
                item.time
                item.user
                item.date
            */}
          {scheduelList.map((item) => (
            <div key={item.bookedBy}>
              <span>Bokad av: {item.user.username}</span>
              <span>
                Time: {`${item.time.startTime} - ${item.time.endTime}`}
              </span>
            </div>
          ))}
        </div>
      )}
      {loading && <div>Loading....</div>}
    </div>
  );
};

const Schedule = compose(withFirebase)(ScheduleBase);
export default Schedule;
