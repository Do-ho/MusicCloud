import React from 'react';
import styled from 'styled-components';

const StyledTitleText = styled.p`
    font-size: 1.5rem;
    font-weight: 700;
    color: rgb(51, 63, 80);
`;

const TitleText = ({children}) => {
    return <StyledTitleText>{children}</StyledTitleText>
}

export { TitleText }