import React from 'react';
import styled from 'styled-components';

const StyledSubContainer = styled.div`
    width: 70rem;
`;

const SubContainer = ({children}) => {
    return <StyledSubContainer>{children}</StyledSubContainer>
}

export { SubContainer }