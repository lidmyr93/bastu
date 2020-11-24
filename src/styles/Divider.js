import { Divider } from "@material-ui/core";
import styled from "styled-components";

export const StyledDivider = styled(Divider)`
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
`;
