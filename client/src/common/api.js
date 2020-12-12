import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:5000";

const getTextMusicData = async (text) => {
    let form = new FormData();
    form.append('text', text);
    const response = await axios.post('/testApi2', form);
    return response.data;
}

export { getTextMusicData };