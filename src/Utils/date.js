import { addWeeks, formatISO, fromUnixTime, getUnixTime } from "date-fns";
import { RULES } from "../constants/rules";

export const getDate = () => formatISO(new Date(), { representation: "date" });

export const getDatePeriod = () => {
  const startDate = dateToTimestamp(getDate());
  const endDate = dateToTimestamp(addWeeks(new Date(), RULES.timePeroidWeeks), {
    representation: "date",
  });
  return { startDate, endDate };
};

export const dateToTimestamp = (date) => getUnixTime(new Date(date));
export const timestampToDate = (timestamp) => fromUnixTime(timestamp);
