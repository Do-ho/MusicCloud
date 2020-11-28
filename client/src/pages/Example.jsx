import React from 'react';
import styled from 'styled-components';
import { Introduce, MainContainer, SubContainer, TitleText } from '../components';
import Search from '../imgs/search-icon.png';
import Sound from '../imgs/sound-icon.png';
import Face from '../imgs/face-icon.png';

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InputWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(0, 41, 104);
    border-radius: 0.7rem;
`;

const Input = styled.input`
    width: 50rem;
    height: 2.5rem;
    outline: none;
    border-radius: 0.7rem;
    padding-left: 1rem;
    border: none;
    color: white;
    background-color: rgb(0, 41, 104);
`;

const MarginDiv = styled.div`
    height: 3rem;
`;

const Icon = styled.img`
    margin-right: 1rem;
    height: 100%;
    cursor: pointer;
`;

const Example = () => {
    return (
    <>
        <Introduce color="rgb(175, 171, 171)" title="Example" description="해당 API를 사용한 예제를 살펴보세요." />
        <MainContainer>
            <SubContainer>
                <TitleText> 당신의 노래를 글귀를 통해 검색해보세요. </TitleText>
                <InputContainer>
                    <InputWrap>
                        <Input />
                        <Icon src={Search}/>
                    </InputWrap>
                </InputContainer>
            </SubContainer>

            <MarginDiv />

            <SubContainer>
                <TitleText> 당신의 노래를 음성을 통해 검색해보세요. </TitleText>
                <InputContainer>
                    <InputWrap>
                        <Input />
                        <Icon src={Sound}/>
                    </InputWrap>
                </InputContainer>
            </SubContainer>

            <MarginDiv />

            <SubContainer>
                <TitleText> 당신의 노래를 얼굴인식을 통해 검색해보세요. </TitleText>
                <InputContainer>
                    <InputWrap>
                        <Input />
                        <Icon src={Face}/>
                    </InputWrap>
                </InputContainer>
            </SubContainer>
        </MainContainer>
    </>
    );
};

export { Example };