import React from 'react'
import styled from 'styled-components';

const StyledFooter = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.5rem;
    background-color: pink;
    color: white;
    font-weight: bold;
    z-index: 1;
`;

const P = styled.div`
    margin-left: 1rem;
`;

const Footer = () => {
    return (
    <StyledFooter>
        <P> Copyright ⓒ2020 KOREATECH. All rights reserved. </P>
    </StyledFooter>);
};

export { Footer };