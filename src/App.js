import './App.css';
import { getWeatherData } from './API/Visual_Crossing';
import { generateImage } from './API/OpenAI';
import { useContext } from 'react';
import AppContext from './State/Context.js';

function App() {
  const { state, setState } = useContext(AppContext);

  const getWeather = async () => {
    const weatherData = await getWeatherData('chicago', '1971-05-12', '1971-05-12');
    console.log(weatherData);
  }
  const handleGenerateImage = async () => {
    await generateImage(state, setState);
  }
  return (
    <div className="App">
      <button onClick={() => getWeather()}>try weather api</button>
      <button onClick={() => handleGenerateImage()}>try dall-e api</button>
      <button onClick={() => getWeather()}>try news api</button>
      {state.images.length > 0 ? <img src={state.images[0]} alt="dall-e generated" /> : null}
      
    </div>
  );
}

export default App;
