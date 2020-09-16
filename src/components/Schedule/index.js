import React, { useEffect, useState } from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

const ScheduleBase = ({ timeList, loading, onSubmit }) => {
  const handleClick = (e) => {
    onSubmit(JSON.parse(e.target.value));
  };

  return (
    <div>
      <p>Max 1 bokning per dag, för att byta tid , boka en ny ledig bastu</p>

      {!loading &&
        timeList &&
        timeList.map((item) => (
          <div>
            <span>{item.startTime}</span>
            <span>{item.endTime}</span>
            <span>{item.type}</span>

            {item.status === Object(item.status) && (
              <>
                <span>{item.status.user.email}</span>
                <span>{item.status.user.username}</span>
              </>
            )}
            {item.status !== Object(item.status) && item.type === "private" && (
              <span>
                <button
                  value={JSON.stringify(item)}
                  onClick={(e) => handleClick(e)}
                >
                  Boka nu
                </button>
              </span>
            )}
            {item.status !== Object(item.status) && item.type === "general" && (
              <span>Gemensam bastu</span>
            )}
          </div>
        ))}
      {loading && <div>Loading....</div>}
    </div>
  );
};

const Schedule = compose(withFirebase)(ScheduleBase);
export default Schedule;
