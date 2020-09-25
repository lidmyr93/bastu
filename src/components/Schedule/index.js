import React from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import BookingCard from "../Card/Card";

const ScheduleBase = ({
  timeList,
  loading,
  onSubmit,
  authUser,
  onDelete,
  userBookingAmount,
}) => {
  const handleClick = (e) => {
    if (!isNaN(e.currentTarget.value)) {
      onSubmit(timeList[e.currentTarget.value]);
    }
  };

  return (
    <div>
      <p>Max 1 bokning per dag, för att byta tid , boka en ny ledig bastu</p>

      {!loading &&
        timeList &&
        timeList.map((item, i) => (
          <BookingCard
            item={item}
            authUser={authUser}
            index={i}
            handleClick={handleClick}
            onDelete={onDelete}
            userBookingAmount={userBookingAmount}
          />
        ))}
      {loading && <div>Loading....</div>}
    </div>
  );
};

const Schedule = compose(withFirebase)(ScheduleBase);
export default Schedule;
