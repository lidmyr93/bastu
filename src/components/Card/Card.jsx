import React from "react";

import Typography from "@material-ui/core/Typography";
import { Divider, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MY_BOOKINGS } from "../../constants/routes";
import { timeStampToFormattedDate } from "../../Utils/date";
import UpdateTime from "../UpdateTime/Switch";
import { StyledCard, StyledCardMedia, StyledCardContent } from "./Card.Styles";
import { StyledButton } from "../../styles/Button";

const BookingCard = ({
  startTime,
  endTime,
  index,
  onClick = false,
  navigate,
  showDate = false,
  activeTime = true,
  header = "",
  subHeader = false,
  buttonText = "",
  headerVariant = "h6",
  subHeaderVariant = "h6",
  wantCompany,
  viewingSelf,
  color,
  buttonColor,
  order = 2,
}) => {
  return (
    <StyledCard activeTime={activeTime} order={order} color={color}>
      <div className={"cardInfo"}>
        <StyledCardMedia activeTime={activeTime}>
          <Typography variant={activeTime ? "h5" : "p"}>
            {startTime} -
          </Typography>
          <Typography variant={activeTime ? "h6" : "p"}> {endTime}</Typography>
        </StyledCardMedia>
      </div>
      <Divider orientation="vertical" flexItem />

      <StyledCardContent activeTime={activeTime}>
        {activeTime ? (
          <Grid
            component="div"
            container
            alignItems="center"
            justify="center"
            direction="row"
            width="100%"
          >
            <div>
              <div>
                <Typography variant={headerVariant}>{header}</Typography>
                {subHeader && (
                  <Typography variant={subHeaderVariant}>
                    {subHeader}
                  </Typography>
                )}
                {wantCompany && !viewingSelf && (
                  <Typography variant={subHeaderVariant}>
                    Öppen för sällskap
                  </Typography>
                )}
                {showDate && (
                  <Typography>{timeStampToFormattedDate(index)}</Typography>
                )}
              </div>
              {onClick && (
                <StyledButton
                  variant="outlined"
                  value={index}
                  onClick={(e) => onClick(e)}
                  size="large"
                  color={buttonColor}
                >
                  {buttonText}
                </StyledButton>
              )}
              {navigate && (
                <Link to={MY_BOOKINGS} style={{ textDecoration: "none" }}>
                  <StyledButton
                    variant="contained"
                    size="medium"
                    color="primary"
                  >
                    Mina bokningar
                  </StyledButton>
                </Link>
              )}
            </div>
            {viewingSelf && (
              <UpdateTime checked={wantCompany || false} timeToUpdate={index} />
            )}
          </Grid>
        ) : (
          <div>
            {showDate && (
              <Typography>{timeStampToFormattedDate(index)}</Typography>
            )}
          </div>
        )}
      </StyledCardContent>
    </StyledCard>
  );
};

export default BookingCard;
