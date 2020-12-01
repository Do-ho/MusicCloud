import React from 'react';
import styled from 'styled-components';

const IntroduceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    witdh: 100%;
    height: 10rem;
    color: white;
    background-color: ${(props) => props.color};
`;

const Title = styled.p`
    font-size: 3rem;
    font-weight: bold;
    margin-right: 4rem;
`;

const Bar = styled.div`
    height: 1.5rem;
    border: 1px solid white;
    margin-right: 1rem;
`;

const Description = styled.p`
    font-weight: bold;
`;

const Introduce = ({color, title, description, children}) => {
    return (
    <IntroduceContainer color={color}>
        <Title> {title} </Title>
        <Bar />
        <Description> {description} </Description>
    </IntroduceContainer>);
}

export { Introduce }