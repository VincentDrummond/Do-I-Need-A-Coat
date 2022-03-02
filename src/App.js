import React, { Component } from "react";
import axios from "axios";

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
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.userInput}&appid=65a5662c7cd41292f65691204889d191`;

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

    getWeatherAdvice = (temperature) => {
      if (temperature > 15) {
        return "You do not need a coat"
      } else if (!this.state.weatherData) {
        return "You do need a coat"
      } else {
        return "Checking if you need a coat"
      }

    };

    getTemperature = () => {
      return Math.round((this.state.weatherData.main.temp -273.15) * 10)/10
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

{/* This is the error meesage from the State */}
            <button onClick={this.onClick}>TAP TO LOOK OUTSIDE</button>



          </div>

          <div className="weatherModules">
            <div className="moduleTemp">
              {this.state.weatherData.main 
                ? `Temperature is
                ${ this.getTemperature() } ${ String.fromCharCode(0x00B0) } c`
                : <p className="loadingtext">LOADING TEMPERATURE</p>
              }
            </div>


{/************************************************/}

            <div className="moduleWind">
              {this.state.weatherData.wind 
                ? `Windspeed is ` +
                (Math.round(this.state.weatherData.wind.speed * 10)/10) + `mph`
                : <p className="loadingtext">LOADING WINDSPEED</p>
              }
            </div>

{/* **********************************************

CANNOT USE THIS MODULE AS THERE IS NO PARAMETER
FOR RAIN IN THE API WEATHER THING

            <div className="moduleRain">
              {this.state.weatherData.main 
                ? `Chance of rain is ` +
                (Math.round(this.state.weatherData.main.humidity)
                  + (String.fromCharCode(0x0025)))
                : <p className="loadingtext">LOADING CHANCE OF RAIN</p>
              }
            </div>*/}
            </div>

{/************************************************/}
    <p className="greatDay"> {this.state.weatherData && this.getWeatherAdvice(this.getTemperature)}
        </p>
      </>
        );
  }
}
  export default App;