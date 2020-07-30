import React from 'react';
import Axios from 'axios';
import DisplayWeather from './weatherComponents/DisplayWeather';
//import './index.css';
import './App.css';
import Navbar from './weatherComponents/Navbar';


class App extends React.Component  {

  //state

  state = {
    coords:{
      latitude: 40,
      longitude: 50
    },
    data: {

    },
    inputData: ""
  }
  componentDidMount() {
    //get device location
    if(navigator.geolocation) {//html API
      
      navigator.geolocation.getCurrentPosition((position) => {
        let newCoords ={
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.setState({coords: newCoords})

        Axios.get(`http://api.weatherstack.com/current?access_key=3f85972e8614d6709e2b02915e40e096&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then(res =>{

          let weatherData = {//save the details
            location: res.data.location.name,
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons

          };
          this.setState({data: weatherData});
      })
      })
    }else {
      console.log("NOT SUPPORTED");
    }
  }
  //track input field
  change = (value) => {
    this.setState({inputData: value})
  }
  weatherChange = (event) => {
    event.preventDefault();

    //api calls
    Axios.get(`http://api.weatherstack.com/current?access_key=3f85972e8614d6709e2b02915e40e096&query=${this.state.inputData}`).then(res => {
      let weatherData = {//save the details
        location: res.data.location.name,
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons

      };
      this.setState({data: weatherData});
    })

  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <Navbar changeWeather = {this.weatherChange} changeRegion = {this.change}/>
          <DisplayWeather weatherData = {this.state.data}/>
          </div>
      </div>
    );
  }
}

export default App;
