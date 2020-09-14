import React, { useEffect, useState } from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

const ScheduleBase = ( {timeList, loading }) => {
  

  
  
  return (
    <div>
      <p>asdadss</p>
    
      {!loading && timeList && timeList.map((item) => 
        <div>
          <span>{item.startTime}</span>
          <span>{item.endTime}</span>
          <span>{item.type}</span>
          
          {item.status === Object(item.status) ? 
          <>
          <span>{item.status.bookedBy}</span> 
          <span>{item.status.date}</span> 
          <span>{item.status.user.email}</span> 
          <span>{item.status.user.username}</span> 
          </>
          : 
          <span>{item.status}</span>}
          
        </div>
      )}
      {loading && <div>Loading....</div>}
    </div>
  );
};

const Schedule = compose(withFirebase)(ScheduleBase);
export default Schedule;
