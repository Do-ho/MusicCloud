import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:5000";

const getTextMusicData = async (text) => {
    let form = new FormData();
    form.append('text', text);
    const response = await axios.post('/testApi2', form);
    return response.data;
}

const getVideoMusicData = async (image) => {
    let form = new FormData();
    form.append('file', image, 'image.png');
    const response = await axios.post('/testApi3', form);
    return response.data;
}

const getAudioMusicData = async (audio) => {
    let form = new FormData();
    form.append('file', audio, 'audio.mp3');
    const response = await axios.post('/testApi1', form);
    return response.data;
}

export { getTextMusicData, getVideoMusicData, getAudioMusicData };