import React from 'react';
import styled from 'styled-components';
import { Introduce, MainContainer } from '../components';
import MainImage2 from '../imgs/ppt/슬라이드2.PNG';
import MainImage3 from '../imgs/ppt/슬라이드3.PNG';
import MainImage4 from '../imgs/ppt/슬라이드4.PNG';
import MainImage5 from '../imgs/ppt/슬라이드5.PNG';
import MainImage6 from '../imgs/ppt/슬라이드6.PNG';
import MainImage7 from '../imgs/ppt/슬라이드7.PNG';
import MainImage8 from '../imgs/ppt/슬라이드8.PNG';
import MainImage9 from '../imgs/ppt/슬라이드9.PNG';
import MainImage10 from '../imgs/ppt/슬라이드16.PNG';

const Img = styled.img`
    width: 70rem;
`;

const Main = () => {
    return (
    <>
        <Introduce color="rgb(118, 113, 113)" title="Product" description="우리의 서비스를 소개합니다." />
        <MainContainer>
            <Img src={MainImage2} />
            <Img src={MainImage3} />
            <Img src={MainImage4} />
            <Img src={MainImage5} />
            <Img src={MainImage6} />
            <Img src={MainImage7} />
            <Img src={MainImage8} />
            <Img src={MainImage9} />
            <Img src={MainImage10} />
        </MainContainer>
    </>
    );
};

export { Main };