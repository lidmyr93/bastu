import { indigo, red, lightGreen } from "@material-ui/core/colors";

const fontSize = {
  xs: "0.25rem",
  s: "0.5rem",
  m: "0.75rem",
  l: "1rem",
  xl: "1.5rem",
};
const colors = {
  primary: indigo["500"],
  success: lightGreen.A400,
  danger: red["500"],
  dateDisabled: red["400"],
  booked: red["400"],
};
const Theme = {
  ...colors,
  fontSize: fontSize,
};

export default Theme;
