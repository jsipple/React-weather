import React, { Component,Fragment } from 'react';
import {isoCountries} from './countries'

class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            zipcode: "27518",
            country: 'US',
            units: 'imperial',
            // want to grab the weather for the upcoming week
            temp: [],
            input: ''
        }
    }
    componentDidMount = () => {
        this.api()
  }
  api =async () => {
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
            weather: result.weather[0].description
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
    this.api()
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
                    <select id="unit">
                        {units}
                    </select>
                    <select id="countries">
                        {ccode}
                    </select>
                    <br />
                    {this.state.temp}
                    <br />
                    {this.state.weather}
                </form>
            </Fragment>
        )
    }
}

export default Weather