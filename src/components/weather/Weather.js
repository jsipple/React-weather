import React, { Component,Fragment } from 'react';
import {isoCountries} from './countries'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faCloudShowersHeavy)
let lat;
let long;
let that;
let src;
class Weather extends Component {
    constructor(props) {
        super(props)
        that=this
        this.state = {
            zipcode: "",
            country: '',
            units: 'imperial',
            // want to grab the weather for the upcoming week
            temp: [],
            input: '',
            lat: '',
            long: '',
            weather: '',
            sunrise: '',
            sunset: ''
        }
        
    }
    componentDidMount = () => {
        this.getLoc()


// need to seach first time with latitude/longitude so maybe make a seperate function for the 
// first api call or find out how to grab zip code/country from geolocator

  }
  getLoc = () => {
    var x = document.getElementById("demo");
      function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } 
    }
    getLocation()
    // the this needs to be bound to the outside so that i can setState and run next function based on that
//   above fixed :)
    function showPosition(position) {
    lat = position.coords.latitude
    long = position.coords.longitude
    that.setState({
        lat: lat,
        long: long
    })
  }
}
// basically just calling whenever long changes not working calling whenever any state changes
// you do need to have prevProps
componentDidUpdate = (prevProps, prevState) => {
    if (this.state.long !== prevState.long) {
        this.apiByLatLong()
    }
    let d = new Date().getTime()/1000
    let nd;
    // the latitude one does not work for this so it says always night
    if (d > this.state.sunrise && d < this.state.sunset) {
      nd = "d"
    } else {
      nd = "n"
    }
    // might edit this so that it grabs the time to determine if day or night can grab sunrise and sunset from api and convert current time
    let icon = document.getElementById("weatherIcon")
    let query;
    let str = this.state.weather.toString()
    let regex1 = /50\d{1}/
    let regex2 = /2\d{2}/
    let regex3 = /3\d{2}/
    let regex4 = /6\d{2}/
    let regex5 = /7\d{2}/
    let regex6 = /8\d{2}/
    let regex7 = /51\d{1}/
    let regex8 = /52\d{1}/
    let url = "http://openweathermap.org/img/w/"
    if (this.state.weather !== prevState.weather) {
      if (regex1.test(this.state.weather)) {
        query = "10"
      }
      if (regex2.test(this.state.weather)) {
        query = "11"
      }
      if (regex3.test(this.state.weather)) {
        query = "9"
      }
      if (regex4.test(this.state.weather)) {
        query = "13"
      }
      if (regex5.test(this.state.weather)) {
        query = "50"
      }
      if (regex6.test(this.state.weather)) {
        if (this.state.weather === 804) {
          let lastChar = str.substr(-1)
          query = "0" + lastChar
        } else {
          let lastChar = str.substr(-1)
          lastChar = parseInt(lastChar)
          lastChar++
          query = "0" + lastChar
        }
      }
      if (regex7.test(this.state.weather)) {
        query = "13"
      }
      if (regex8.test(this.state.weather)) {
        query = "09"
      }
      let queryURL = url + query + nd + ".png"
      icon.src = queryURL
    }
  if (this.state.units !== prevState.units) {
    if (this.state.zipcode !== '') {
      this.apiByZip()
    } else {
      this.apiByLatLong()
    }
  }
}
  apiByLatLong = async () => {
    let apiKey = 'f1fa8d030881f674696a9ba2c10ca999'
    // might have to shorten latitude or long need to check on that
//   let url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID='
  let queryURL = new Request('http://api.openweathermap.org/data/2.5/find?lat=' + lat  + "&lon=" + long + "&units=" + this.state.units + "&cnt=1&appid=" + apiKey)
  console.log(queryURL)
  fetch(queryURL)
  .then(res => res.json())
  .then(
    (result) => {
        this.setState({
            temp: result.list[0].main.temp,
            weather: result.list[0].weather[0].id,
            sunrise: result.list[0].sys.sunrise,
            sunset: result.list[0].sys.sunset
        })
        // always getting the same result
        console.log(result.list[0])
        console.log(this.state)
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
        console.log(error)
    }
  )
}
  apiByZip = async () => {
    await this.countrySelected()
    await this.unitSelected()
  let apiKey = 'f1fa8d030881f674696a9ba2c10ca999'
//   let url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID='
  let queryURL = new Request('http://api.openweathermap.org/data/2.5/weather?zip=' + this.state.zipcode + "," + this.state.country + "&units=" + this.state.units + "&appid=" + apiKey)
  console.log(queryURL)
  fetch(queryURL)
  .then(res => res.json())
  .then(
    (result) => {
        this.setState({
            temp: result.main.temp,
            weather: result.weather[0].id,
            sunrise: result.sys.sunrise,
            sunset: result.sys.sunset
        })
        // always getting the same result
        console.log(result)
        console.log(this.state)
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
        console.log(error)
    }
  )
  }
  handleChange = (e) => {
    this.setState({
        input: e.target.value
    })
  }
//   this continous pings the server
//   componentDidUpdate = () => {
//       this.componentDidMount()
//   }
  handleSubmit = (e) => {
      e.preventDefault()
    this.setState({
        zipcode: this.state.input
    },
    this.countrySelected(),
    this.unitSelected()
    )
    // call a different component
    this.apiByZip()
  }
  countrySelected = () => {
      let selects = document.getElementById("countries")
    //   need to figure out how to get this to run when selected
    //   let selected = selects[selects.selectedIndex].value
      let selected = selects.options[selects.selectedIndex].value
      let code = selected.slice(-2)
      this.setState({
          country: code
      })
  }
  unitSelected = () => {
    let selects = document.getElementById("unit")
      let selected = selects.options[selects.selectedIndex].value
      let unit;
        switch (selected) {
            case ("F"):
            unit = "imperial"
            break;
            case ("C"):
            unit = "metric"
            break;
      }
      this.setState({
          units: unit
      })
      console.log(this.state)
  }
    render() {
        let unitsArr = ["F", "C"]
        // probably want to switch this so I import the array
        let countries = Object.entries(isoCountries)
        const units = unitsArr.map( (x, i) => <option value={x} key={i}>{x}</option>)
        const ccode = countries.map( (x, i) => <option value={x} key={i}>{x.join("-")}</option>)
        return (
            <Fragment>
                <h1>Weather</h1>    
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Enter your zipcode" onChange={this.handleChange}/>
                    <select id="unit" onChange={this.unitSelected}>
                        {units}
                    </select>
                    <select id="countries">
                        {ccode}
                    </select>
                    <br />
                    <img id="weatherIcon" src={src}/>
                    <br />
                    {this.state.temp}
                </form>
            </Fragment>
        )
    }
}

export default Weather