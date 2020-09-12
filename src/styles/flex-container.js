import styled from "styled-components";



export const FlexContainer = styled.div`
    display:flex;
    flex-direction:${props => props.direction || "initial"};
    justify-content: ${props => props.justify || "center"};
    align-items: ${props => props.align || "center" };
    width: ${props => props.width || "auto"}
`;


export const FlexForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
`;