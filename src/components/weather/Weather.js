import React, { Component } from 'react';

class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: 'Morrisville'
        }
    }
    componentDidMount = () => {
      let apiKey = 'f1fa8d030881f674696a9ba2c10ca999'
    //   let url = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID='
      let queryURL = 'api.openweathermap.org/data/2.5/weather?q=' + this.state.city + "&appid=" + apiKey
        fetch(queryURL).then(response => {
            console.log(response.json())
            return response.json()
        })
    }
    render() {
        return (
            <div>
                hi
            </div>
        )
    }
}

export default Weather