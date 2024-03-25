import axios from "axios";


export const generateImage = async (state, setState) => {
    const prompt = `please create a very simple image of a dog. this is a test.`
    const key = process.env.REACT_APP_OPENAI_API_KEY;
    const endpoint = 'https://api.openai.com/v1/images/generations'

    const headers = {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
    };

    const data = {
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    };

    try {
        const response = await axios.post(endpoint, data, { headers: headers });
        console.log("response from generateImage: ", response.data.data[0].url);
        setState({ ...state, images: [...state.images, response.data.data[0].url] })
    } catch (err) {
        console.error("Error in generateImage: ", err);
    }
}