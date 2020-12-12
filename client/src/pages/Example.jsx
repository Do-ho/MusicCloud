import React, { useState } from 'react';
import styled from 'styled-components';
import { Introduce, MainContainer, SubContainer, TitleText } from '../components';
import Search from '../imgs/search-icon.png';
import Sound from '../imgs/sound-icon.png';
import Face from '../imgs/face-icon.png';
import { getTextMusicData } from '../common/api';

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

const Data = styled.div`
  display: flex;
`;

const MusicContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70rem;
//   jusify-contenr: center;
  align-items: center;
  margin-top: 1rem;

`;

const MusicBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30rem;
`;

const MusicTitle = styled.p`
  margin-right: 1rem;
`;

const MusicPlayButton = styled.button`
  height: 1.5rem;
`;

const ResultTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Example = () => {
    const [text, setText] = useState('');
    const [textData, settextData] = useState(null);
    const handlingText = (e) => {
        setText(e.target.value)
    }

    const handlingClickText = async () => {
        const data = await getTextMusicData(text);
        settextData(data);
    }
    
    const createTextData = () => {
        console.log(textData);
        if(textData === null) return null;
        let i = 0;
        const mydata = textData.data.map((item)=> {
            i += 1;
            return <Data key={item.id}>
                <MusicBody>
                    <MusicTitle>{item.title}</MusicTitle>
                    <MusicPlayButton onClick={()=> {window.open(item.assets.preview_mp3.url, i+'번 음악')}}> 음악재생 </MusicPlayButton>
                </MusicBody>
            </Data>
        });
        return <MusicContainer>
            <ResultTitle>검색결과</ResultTitle>
            {mydata}
            </MusicContainer>;
    }

    return (
    <>
        <Introduce color="rgb(175, 171, 171)" title="Example" description="해당 API를 사용한 예제를 살펴보세요." />
        <MainContainer>
            <SubContainer>
                <TitleText> 당신의 노래를 글귀를 통해 검색해보세요. </TitleText>
                <InputContainer>
                    <InputWrap>
                        <Input value={text} onChange={handlingText}/>
                        <Icon src={Search} onClick={handlingClickText}/>
                    </InputWrap>
                </InputContainer>
            </SubContainer>
            {createTextData()}
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