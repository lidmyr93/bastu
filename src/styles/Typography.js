import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

export const StyledTypography = styled(Typography)`
  color: ${(props) => props.theme[props.color] || "#000"};
`;
