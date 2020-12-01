import React from 'react';
import styled from 'styled-components';

const StyledMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 2rem;
`;

const MainContainer = ({children}) => {
    return <StyledMainContainer>{children}</StyledMainContainer>
}

export { MainContainer }