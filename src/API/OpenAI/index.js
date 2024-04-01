import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

// export const generateImage = async (city, weatherData, month, year) => {
//     let prompt = '';

//     if(weatherData.description === '') {
//         prompt = `please generate a highly detailed image of the skyline of ${city} in the month of ${month} and the year of ${year}.`
//     } else {
//         prompt = `please generate a highly detailed image of the skyline ${city} in the month of ${month} and the year of ${year} with the following weather conditions: ${weatherData.description}.`
//     }

//     const key = process.env.REACT_APP_OPENAI_API_KEY;
//     const endpoint = 'https://api.openai.com/v1/images/generations'

//     const headers = {
//         'Authorization': `Bearer ${key}`,
//         'Content-Type': 'application/json',
//     };

//     const data = {
//         prompt: prompt,
//         n: 1,
//         size: "1024x1024",
//     };

//     try {
//         const response = await axios.post(endpoint, data, { headers: headers });
//         // console.log("response from generateImage: ", response.data.data[0].url);
//         return response.data.data[0].url
//     } catch (err) {
//         console.error("Error in generateImage: ", err);
//     }
// }

export const generateImage = async (city, weatherData, month, year) => {
    let prompt = '';
    let image_url
    if (weatherData.description === '') {
        prompt = `please generate a highly detailed image of the skyline of ${city} in the month of ${month} and the year of ${year}.`
    } else {
        prompt = `please generate a highly detailed image of the skyline ${city} in the month of ${month} and the year of ${year} with the following weather conditions: ${weatherData.description}.`
    }
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "hd",
        })
        return response.data[0].url
        
    } catch (err) {
        console.error("Error in generateImage: ", err);
    }
}

export const generateHeadlines = async (month, year) => {
    const prompt = `I would like you to give me 5 real headlines for the month of ${month} in the year ${year}. these will be used in a scrolling marquee so they must be short and to the point. please return them in JSON format as an array of strings.
    the format should look like this: ["headline", "headline", "headline", "headline", "headline"] with "headline" replaced with one of your headlines. it is essential that the format is correct. thank you.`

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `${prompt}` }],
            model: "gpt-3.5-turbo",
            max_tokens: 60,
        })
        return completion
    } catch (err) {
        console.error("Error in generateHeadlines: ", err);
    }
};