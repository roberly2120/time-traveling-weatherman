import React from 'react';
import { getWeatherData } from '../API/Visual_Crossing';
import { generateImage } from '../API/OpenAI';
import { generateHeadlines } from '../API/OpenAI';
import { useContext, useState } from 'react';
import Headlines from './Headlines.js';
import AppContext from '../State/Context.js';
import { Flex, Box, Text, Button, Image, AspectRatio, Spinner } from '@chakra-ui/react';
import LocTimeSelector from './LocTimeSelector.js';


export default function WeathermanContainer() {
    const { state, setState } = useContext(AppContext);
    const [city, setCity] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [day, setDay] = useState('');
    const [currentHeadlines, setCurrentHeadlines] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [previousData, setPreviousData] = useState([]);
    const startDate = `${year}-${month}-${day}`;
    const endDate = `${year}-${month}-${day}`;

    const handleGetWeather = async () => {
        const weatherData = await getWeatherData(city, startDate, endDate);
        return weatherData;
    }
 
    const handleGenerateAll = async () => {
        setIsLoading(true);
        try {
            const weatherData = await handleGetWeather();
            let weatherDataObject = { conditions: weatherData.days[0].conditions, description: weatherData.days[0].description };

            const imagePromise = generateImage(city, weatherDataObject, month, year);
            const headlinesPromise = generateHeadlines(month, year);

            const [image, headlines] = await Promise.all([imagePromise, headlinesPromise]);

            const headlinesString = (headlines.choices[0].message.content);
            const headlinesArray = JSON.parse(headlinesString);
            setCurrentHeadlines(headlinesArray);

            setCurrentImage(image);
            setIsLoading(false);
            const newPreviousData = [...previousData, { city, month, year, day, image, headlines }];
            setPreviousData(newPreviousData);
            
        } catch (error) {
            console.error('Error generating all: ', error);
        }

    }
    // for loading spinner, if isLoading && !currentImage, show spinner
    return (
        <>
            <Flex direction="column" align="center" mt="50px" mb="25px">
                <AspectRatio width="60%" ratio={16 / 9} mb="15px">
                    <Box border= {currentImage == '' ? "1px solid gray" : ''}>
                        {currentImage !== '' ? (
                            <Image src={currentImage} alt="Generated Image" />
                        ) : (
                            <Text fontSize="2xl">{isLoading && !currentImage ? <Spinner /> : "Select a City and Date"}</Text> // need something more elegant here + a loading spinner
                        )}
                    </Box>
                </AspectRatio>
                <Headlines headlines={currentHeadlines} />
                <LocTimeSelector generateAll={handleGenerateAll} city={city} setCity={setCity} month={month} setMonth={setMonth} year={year} setYear={setYear} day={day} setDay={setDay} />
            </Flex>
        </>
    )
}