import './App.css';
import HourlyForecast from "./HourlyForecast.js";
import {useState, useEffect} from "react";
import Question from "./Question.js";
import Controls from "./Controls.js";
import AccuracyInfo from "./AccuracyInfo.js";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CurrentWeather from "./CurrentWeather.jsx";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const [latData, setLatData] = useState([]);
  const [weatherData, setWeatherData] = useState();
  const [latitude, setLatitude]=useState(38.8852);//HUGE learning opp: learned that when creating api calls dependent on eachother, we must use state variables and error catching
  const [longitude, setLongitude]=useState(-77.3233);
  const [icon, setIcon]=useState();
  const [articles, setArticles]=useState([]);
  //const [numOfUnansweredQuestions, setNumOfUnansweredQuestions] = useState(0);
  //const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0);
  //const [numOfIncorrectAnswers, setNumOfIncorrectAnswers] = useState(0);

  useEffect(() => {
    generateLatitudeAndLongitude()
    generateWeather();
    generateIcon();
    generateArticles();
  }, []);

  /*const generateQuestions = (numOfQuestions=10, categoryID=0) => {
    fetch("https://opentdb.com/api.php?amount=" + numOfQuestions + "&category=" + categoryID)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setQuestions(res.results);
    });
    setNumOfUnansweredQuestions(numOfQuestions);
  }*/


  const generateWeather = (latitude=38.8852, longitude=-77.3233) => {
    
    console.log("IS CALLED2");
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+latitude.toString()+"&lon="+longitude.toString()+"&appid=6994f82b8116af4a1c68d8d86885d40e")
    //fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=6994f82b8116af4a1c68d8d86885d40e")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setWeatherData(res);
      if (weatherData!== undefined){
        generateIcon(weatherData.current.weather[0].icon);
      }
      
    });
  }

  const generateLatitudeAndLongitude = (zipCode=22124, countryCode="US") => {
    console.log("IS CALLED");
    fetch("http://api.openweathermap.org/geo/1.0/zip?zip="+zipCode+","+countryCode+"&appid=6994f82b8116af4a1c68d8d86885d40e")
    .then((res) => res.json())
    .catch(function (err) {
        setLatitude(38.8852);
        setLongitude(-77.3233);
      })
    .then((res) => {
      console.log(res);
      setLatData(res);
      setLatitude(latData.lat);
      setLongitude(latData.lon);
    });
  }

  const generateIcon = (iconCode="10d") => {
    console.log("IS CALLED");
    fetch("http://openweathermap.org/img/wn/"+iconCode+".png")
    .then((res) => res.json())
    .catch(function (err) {
        console.log("fail?");
      })
    .then((res) => {
      console.log("ICON INFO: "+res);
      console.log("succeed?");
      setIcon(res);
    });
  }

  const generateArticles = () => {
    console.log("IS CALLED");
    fetch("https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=fuYjWN0FWaT7wKK1cfg1gnAUUPprGmuk")
    .then((res) => res.json())
    .catch(function (err) {
        
      })
    .then((res) => {
      console.log(res);
      setArticles(res);
      
    });
  }

  //console.log("Testing1: "+latData.lat.toString());
  //console.log("Testing2: "+latData.lon.toString());
  
  /*const onAnswer = (correct) => {
    setNumOfUnansweredQuestions((previous) => previous - 1);
    if (correct) {
      setNumOfCorrectAnswers((previous) => previous + 1);
    } else {
      setNumOfIncorrectAnswers((previous) => previous + 1);
    }
  }*/

  

  return (
    <Switch>
      <div className="App">
        <div className="sidebar">
          <Typography variant="h2" className="title"> WEATHER </Typography>
          <>{/*<AccuracyInfo unanswered={numOfUnansweredQuestions} correct={numOfCorrectAnswers} incorrect={numOfIncorrectAnswers}/>*/}</>
          {<Controls  data={latData} generateArticles={generateArticles} generateIcon={generateIcon} generateWeather={generateWeather} generateLatitudeAndLongitude={generateLatitudeAndLongitude} />}
        </div>
        <>{/*questions.map((question) => <Question question={question} onAnswer={onAnswer} key={question.question} />)*/}</>
        <CurrentWeather  articles={articles} icon={icon} data={weatherData} generateArticles={generateArticles} generateWeather={generateWeather}/>
        
      </div>
    </Switch>
  );
}

export default App;
