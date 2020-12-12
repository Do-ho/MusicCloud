import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Introduce, MainContainer, SubContainer, TitleText } from '../components';
import Search from '../imgs/search-icon.png';
import Sound from '../imgs/sound-icon.png';
import Face from '../imgs/face-icon.png';
import { getAudioMusicData, getTextMusicData, getVideoMusicData } from '../common/api';
import Webcam from "react-webcam";
import useRecorder from '../common/useRecoder';

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

const WebcamContainer = styled.div`
  display:flex;
  justify-content: center;
  margin-top: 1rem;
`;

const AudioContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const AudioButton = styled.button`
  margin: 0rem 1rem;
  height: 2rem;
`;

const Example = () => {
    const webcamRef = useRef();
    const [text, setText] = useState('');
    const [imageData, setImageData] = useState(null);
    const [webcamData, setWebcamData] = useState(null);
    const [textData, settextData] = useState(null);
    const [isPhotoMode, setPhotoMode] = useState(false);
    const [isVoiceMode, setVoiceMode] = useState(false);
    let [audioURL, isRecording, startRecording, stopRecording, blobObject] = useRecorder();

    const handlingText = (e) => {
        setText(e.target.value)
    }

    const handlingClickText = async () => {
        const data = await getTextMusicData(text);
        data.data = shuffle(data.data);
        settextData(data);
        setWebcamData(null);
        setImageData(null);
    }

    const shuffle = (array) => {
        let shuffled = array
            .map(a => ([Math.random(),a]))
            .sort((a,b) => a[0]-b[0])
            .map(a => a[1])
      
        return shuffled;
      }
    
    const createData = (musicData) => {
        if(musicData === null) return null;
        let i = 0;
        
        const mydata = musicData.data.map((item)=> {
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

    /* https://helloinyong.tistory.com/233 */
    const dataURLtoFile = (dataurl, fileName) => {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], fileName, {type:mime});
    }

    const capture = React.useCallback(
        async () => {
          setPhotoMode(false);
          const imageSrc = webcamRef.current.getScreenshot();
          const data = await getVideoMusicData(dataURLtoFile(imageSrc, 'image.png'));
          data.data = shuffle(data.data);
          setWebcamData(data);
          settextData(null);
          setImageData(null);
        },
        [webcamRef]
      );

    const handlingAudioData = async () => {
        var file = new File([blobObject], "audio.mp3");
        const data = await getAudioMusicData(file);
        data.data = shuffle(data.data);
        setImageData(data);
        setVoiceMode(false);
        setWebcamData(null);
        settextData(null);
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
            {createData(textData)}
            <MarginDiv />

            <SubContainer>
                <TitleText> 당신의 노래를 음성을 통해 검색해보세요. </TitleText>
                <InputContainer>
                    <InputWrap>
                        <Input />
                        <Icon onClick={()=>setVoiceMode(true)}src={Sound}/>
                    </InputWrap>
                </InputContainer>
                {isVoiceMode?
                    <AudioContainer>
                        <audio src={audioURL} controls />
                        <AudioButton onClick={startRecording} disabled={isRecording}>
                            start recording
                        </AudioButton>
                        <AudioButton onClick={stopRecording} disabled={!isRecording}>
                            stop recording
                        </AudioButton>
                        <AudioButton onClick={handlingAudioData}>검색하기</AudioButton>
                    </AudioContainer>: null
                }
            </SubContainer>
            {createData(imageData)}

            <MarginDiv />

            <SubContainer>
                <TitleText> 당신의 노래를 얼굴인식을 통해 검색해보세요. </TitleText>
                <InputContainer>
                    <InputWrap>
                        <Input />
                        <Icon onClick={() => setPhotoMode(!isPhotoMode)} src={Face}/>
                    </InputWrap>
                </InputContainer>
                {isPhotoMode?
                    <WebcamContainer>
                        <Webcam
                        width="300px"
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        />
                        <button onClick={capture}>Capture photo</button>
                    </WebcamContainer>
                : null
                }
            </SubContainer>
            {createData(webcamData)}
        </MainContainer>
    </>
    );
};

export { Example };