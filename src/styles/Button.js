import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const StyledButton = styled(Button)`
  font-size: ${({ fontSize }) => fontSize || "inherit"};
  color: ${({ theme, color, variant }) =>
    variant === "contained" ? "white" : theme[color]};
  background: ${({ background }) => background};
  border: ${({ theme, color, variant }) =>
    variant === "contained" ? "none" : `1px solid ${theme[color]}`};
`;
