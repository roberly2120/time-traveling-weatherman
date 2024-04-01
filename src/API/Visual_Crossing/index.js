import axios from 'axios';

export const getWeatherData = async (city, startDate, endDate) => {

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=us&key=${process.env.REACT_APP_VISUAL_CROSSING_API_KEY}&contentType=json`

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data: ', error);
    }
};