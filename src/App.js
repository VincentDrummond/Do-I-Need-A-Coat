import React, { Component } from "react";
import axios from "axios";

const myAPIKey = process.env.REACT_APP_WEATHER_API_KEY

class App extends Component {
  
  state = { weatherData: {}, error: false};
  
// when component mounts
  componentDidMount() {
// go get the users location, call showUserPosition
    navigator.geolocation.getCurrentPosition(this.showPosition);
  }

//showUserPosition function gets the position and sends it to getWeatherData
  showPosition = (position) => {
    this.getWeatherData(position);
}

// getWeatherData
    async getWeatherData(position) {
// from this url - replace placename from user input box
    const url =
      `https://api.openweathermap.org/data/2.5/onecall?=q${this.state.userInput}&exclude=hourly,minutely,current,alerts&appid=${myAPIKey}}`;

// get the contents of the url using axios
      try {
        const result = await axios.get(url);

// and save it to the state on line 07
        this.setState({weatherData: result.data, error: false});
// the error in state is set to false if the weatherData function works
    } catch (error) {
// the error in state is switched to true if the weatherData function fails
      this.setState({error: true});
    }
  }

    onInput = (event) => {
      this.setState({userInput: event.target.value});
    };

    onClick = () => {
      this.getWeatherData();
    };

    getWeatherAdvice = (conditions) => {
      if (temperature > 15) && (wind_speed < 19) && (pop < 10); {
        return "You do not need a coat"
      } else if (!this.state.weatherData) {
        return "You probably need a coat"
      } else {
        return "Checking if you need a coat"
      }

    };

    getTemperature = () => {
      return Math.round((this.state.weatherData.daily.temp.day -273.15) * 10)/10
    };

    getWindspeed = () => {
      return Math.round(this.state.weatherData.daily.wind_speed * 10)/10
    };

    getRainChance = () => {
      return Math.round(this.state.weatherData.daily.pop * 10)/10
    };


// render the following to the browser
      render() {
        return (
      <>
      <h1>DO I NEED A COAT?</h1>
      <p>WE CHECK OUTSIDE,</p>
      <p>SO YOU DON'T HAVE TO</p>

          <div className="inputs">
            <input onInput={this.onInput} type="text" 
                  value={this.state.error ? `Not a valid location` :
                            this.state.userInput}
                  placeholder="ENTER LOCATION"/>

            <button onClick={this.onClick}>TAP TO LOOK OUTSIDE</button>

          </div>

{/************************************************/}

        <div className="weatherModules">
            <div className="moduleTemp">
              {this.state.weatherData.daily.temp.day
                ? `Temperature is
                ${ this.getTemperature() } ${ String.fromCharCode(0x00B0) } c`
                : <p className="loadingtext">LOADING TEMPERATURE</p>
              }
            </div>


{/************************************************/}

            <div className="moduleWind">
              {this.state.weatherData.daily.wind_speed
                ? `Windspeed is
                ${ this.getWindspeed() } mph`
                : <p className="loadingtext">LOADING WINDSPEED</p>
              }
            </div>

{/************************************************/}


            <div className="moduleRain">
              {this.state.weatherData.daily.pop
                ? `Chance of rain is
                ${ this.getRainChance() } ${ String.fromCharCode(0x0025) }`
                : <p className="loadingtext">LOADING RAIN</p>
              }
            </div>
        </div>

{/************************************************/}

    <p className="greatDay"> {this.state.weatherData && this.getWeatherAdvice(this.getTemperature)}
        </p>
      </>
        );
  }
}
  export default App;