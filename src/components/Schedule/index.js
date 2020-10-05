import React from "react";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import BookingCard from "../Card/Card";
import { RULES } from "../../constants/rules";
import { Box } from "@material-ui/core";

const ScheduleBase = ({
  timeList,
  loading,
  onSubmit,
  authUser,
  onDelete,
  bookingPerDayLimit,
  bookingPerWeeksLimit,
}) => {
  const handleClick = (e) => {
    if (!isNaN(e.currentTarget.value)) {
      onSubmit(timeList[e.currentTarget.value]);
    }
  };
  function bookedTimeSelf(item, authUser) {
    if (
      item.status === Object(item.status) &&
      item.status.user.uid === authUser.uid
    ) {
      return true;
    }
    return false;
  }
  function bookedTime(item, authUser) {
    if (
      item.status === Object(item.status) &&
      item.status.user.uid !== authUser.uid
    ) {
      return true;
    }
    return false;
  }
  function userCanBook(item, bookingPerWeeksLimit, bookingPerDayLimit) {
    if (
      item.status !== Object(item.status) &&
      item.type === "private" &&
      bookingPerWeeksLimit < RULES.maxBookingAmount &&
      !bookingPerDayLimit
    ) {
      return true;
    }
    return false;
  }
  function reachedMaxBookingDuringTimePeroid(
    item,
    bookingPerDayLimit,
    bookingPerWeeksLimit
  ) {
    if (
      item.status !== Object(item.status) &&
      item.type === "private" &&
      !bookingPerDayLimit &&
      bookingPerWeeksLimit >= RULES.maxBookingAmount
    ) {
      return true;
    }
    return null;
  }
  function timeAlreadyBookedSameDay(item, bookingPerDayLimit) {
    if (
      item.status !== Object(item.status) &&
      item.type === "private" &&
      bookingPerDayLimit
    ) {
      return true;
    }
    return null;
  }
  function NonBookableTime(item) {
    if (item.status !== Object(item.status) && item.type === "general") {
      return true;
    }
    return null;
  }
  return (
    <Box display="flex" flexDirection="column" mt="0.5rem">
      {!loading &&
        timeList &&
        timeList.map((item, i) => (
          <>
            {bookedTimeSelf(item, authUser) && (
              <BookingCard
                startTime={item.startTime}
                endTime={item.endTime}
                index={item.status.date}
                onClick={onDelete}
                header="Din tid"
                buttonText="Avboka"
                color="blue"
                buttonColor="red"
                order="1"
              />
            )}
            {bookedTime(item, authUser) && (
              <BookingCard
                startTime={item.startTime}
                endTime={item.endTime}
                index={i}
                header={`Bokad av: ${item.status.user.username}`}
                subHeader={`Hus: ${item.status.user.houseNumber}`}
                color="red"
              />
            )}
            {userCanBook(item, bookingPerWeeksLimit, bookingPerDayLimit) && (
              <BookingCard
                startTime={item.startTime}
                endTime={item.endTime}
                index={i}
                onClick={handleClick}
                header="Ledig tid"
                buttonText="Boka nu"
                color="green"
                buttonColor="green"
              />
            )}
            {reachedMaxBookingDuringTimePeroid(
              item,
              bookingPerDayLimit,
              bookingPerWeeksLimit
            ) && (
              <BookingCard
                startTime={item.startTime}
                endTime={item.endTime}
                index={i}
                header="Max bokningar för tids-intervall"
                headerVariant="h6"
                color="red"
                navigate
              />
            )}
            {timeAlreadyBookedSameDay(item, bookingPerDayLimit) && (
              <BookingCard
                startTime={item.startTime}
                endTime={item.endTime}
                index={i}
                header="Existerande bokning för dagen"
                color="red"
                navigate
              />
            )}
            {NonBookableTime(item) && (
              <BookingCard
                startTime={item.startTime}
                endTime={item.endTime}
                index={i}
                header="Gemensam bastu"
                color="green"
              />
            )}
          </>
        ))}
    </Box>
  );
};

const Schedule = compose(withFirebase)(ScheduleBase);
export default Schedule;
