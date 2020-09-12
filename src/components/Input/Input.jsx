import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";

import { green } from "@material-ui/core/colors";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
    width: "100%"
  },
}));

export default function CustomizedInput({
  onChange,
  name,
  value,
  type = "text",
  placeholder,
  label,
}) {
  const classes = useStyles();

  return (
    <CssTextField
      className={classes.margin}
      id="custom-css-standard-input"
      label={label || ""}
      onChange={(e) => onChange(e)}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
    />
  );
}
