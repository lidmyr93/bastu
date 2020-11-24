import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

export const StyledCard = styled(Card)`
  display: flex;
  margin: 0.25rem auto;
  height: ${({ activeTime }) => (activeTime ? "150px" : "50px")};

  border: ${({ activeTime, color, theme }) =>
    activeTime ? `1px solid ${theme[color]}` : "none"};
  border-left: ${({ activeTime, color, theme }) =>
    activeTime ? `15px solid ${theme[color]}` : "none"};

  order: ${({ order }) => order};

  .cardInfo {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledCardMedia = styled(CardMedia)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 70%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ activeTime }) => (activeTime ? "column" : "initial")};
`;
export const StyledCardContent = styled(CardContent)`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ activeTime }) => (activeTime ? "center" : "center")};
  align-items: center;
  padding: 8px;
  &:last-child: {
    padding-bottom: 8px;
  }
`;
