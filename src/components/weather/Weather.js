import React, { Component,Fragment } from 'react';

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
  handleSubmit = (e) => {
      e.preventDefault()
    this.setState({
        zipcode: this.state.input
    })
    this.countrySelected()
    this.unitSelected()
    // this is running before the state changes
    this.componentDidMount()
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
        var isoCountries = {
            'Afghanistan': 'AF',
            'Aland Islands': 'AX',
            'Albania': 'AL',
            'Algeria': 'DZ',
            'American Samoa': 'AS',
            'Andorra': 'AD',
            'Angola': 'AO',
            'Anguilla': 'AI',
            'Antarctica': 'AQ',
            'Antigua And Barbuda': 'AG',
            'Argentina': 'AR',
            'Armenia': 'AM',
            'Aruba': 'AW',
            'Australia': 'AU',
            'Austria': 'AT',
            'Azerbaijan': 'AZ',
            'Bahamas': 'BS',
            'Bahrain': 'BH',
            'Bangladesh': 'BD',
            'Barbados': 'BB',
            'Belarus': 'BY',
            'Belgium': 'BE',
            'Belize': 'BZ',
            'Benin': 'BJ',
            'Bermuda': 'BM',
            'Bhutan': 'BT',
            'Bolivia': 'BO',
            'Bosnia And Herzegovina': 'BA',
            'Botswana': 'BW',
            'Bouvet Island': 'BV',
            'Brazil': 'BR',
            'British Indian Ocean Territory': 'IO',
            'Brunei Darussalam': 'BN',
            'Bulgaria': 'BG',
            'Burkina Faso': 'BF',
            'Burundi': 'BI',
            'Cambodia': 'KH',
            'Cameroon': 'CM',
            'Canada': 'CA',
            'Cape Verde': 'CV',
            'Cayman Islands': 'KY',
            'Central African Republic': 'CF',
            'Chad': 'TD',
            'Chile': 'CL',
            'China': 'CN',
            'Christmas Island': 'CX',
            'Cocos (Keeling) Islands': 'CC',
            'Colombia': 'CO',
            'Comoros': 'KM',
            'Congo': 'CG',
            'Congo, Democratic Republic': 'CD',
            'Cook Islands': 'CK',
            'Costa Rica': 'CR',
            "Cote D'Ivoire": 'CI',
            'Croatia': 'HR',
            'Cuba': 'CU',
            'Cyprus': 'CY',
            'Czech Republic': 'CZ',
            'Denmark': 'DK',
            'Djibouti': 'DJ',
            'Dominica': 'DM',
            'Dominican Republic': 'DO',
            'Ecuador': 'EC',
            'Egypt': 'EG',
            'El Salvador': 'SV',
            'Equatorial Guinea': 'GQ',
            'Eritrea': 'ER',
            'Estonia': 'EE',
            'Ethiopia': 'ET',
            'Falkland Islands': 'FK',
            'Faroe Islands': 'FO',
            'Fiji': 'FJ',
            'Finland': 'FI',
            'France': 'FR',
            'French Guiana': 'GF',
            'French Polynesia': 'PF',
            'French Southern Territories': 'TF',
            'Gabon': 'GA',
            'Gambia': 'GM',
            'Georgia': 'GE',
            'Germany': 'DE',
            'Ghana': 'GH',
            'Gibraltar': 'GI',
            'Greece': 'GR',
            'Greenland': 'GL',
            'Grenada': 'GD',
            'Guadeloupe': 'GP',
            'Guam': 'GU',
            'Guatemala': 'GT',
            'Guernsey': 'GG',
            'Guinea': 'GN',
            'Guinea-Bissau': 'GW',
            'Guyana': 'GY',
            'Haiti': 'HT',
            'Heard Island & Mcdonald Islands': 'HM',
            'Holy See (Vatican City State)': 'VA',
            'Honduras': 'HN',
            'Hong Kong': 'HK',
            'Hungary': 'HU',
            'Iceland': 'IS',
            'India': 'IN',
            'Indonesia': 'ID',
            'Iran, Islamic Republic Of': 'IR',
            'Iraq': 'IQ',
            'Ireland': 'IE',
            'Isle Of Man': 'IM',
            'Israel': 'IL',
            'Italy': 'IT',
            'Jamaica': 'JM',
            'Japan': 'JP',
            'Jersey': 'JE',
            'Jordan': 'JO',
            'Kazakhstan': 'KZ',
            'Kenya': 'KE',
            'Kiribati': 'KI',
            'Republic of Korea': 'KR',
            'South Korea': 'KR',
            "Democratic People's Republic of Korea": 'KP',
            'North Korea': 'KP',
            'Kuwait': 'KW',
            'Kyrgyzstan': 'KG',
            "Lao People's Democratic Republic": 'LA',
            'Latvia': 'LV',
            'Lebanon': 'LB',
            'Lesotho': 'LS',
            'Liberia': 'LR',
            'Libyan Arab Jamahiriya': 'LY',
            'Liechtenstein': 'LI',
            'Lithuania': 'LT',
            'Luxembourg': 'LU',
            'Macao': 'MO',
            'Macedonia': 'MK',
            'Madagascar': 'MG',
            'Malawi': 'MW',
            'Malaysia': 'MY',
            'Maldives': 'MV',
            'Mali': 'ML',
            'Malta': 'MT',
            'Marshall Islands': 'MH',
            'Martinique': 'MQ',
            'Mauritania': 'MR',
            'Mauritius': 'MU',
            'Mayotte': 'YT',
            'Mexico': 'MX',
            'Micronesia, Federated States Of': 'FM',
            'Moldova': 'MD',
            'Monaco': 'MC',
            'Mongolia': 'MN',
            'Montenegro': 'ME',
            'Montserrat': 'MS',
            'Morocco': 'MA',
            'Mozambique': 'MZ',
            'Myanmar': 'MM',
            'Namibia': 'NA',
            'Nauru': 'NR',
            'Nepal': 'NP',
            'Netherlands': 'NL',
            'Netherlands Antilles': 'AN',
            'New Caledonia': 'NC',
            'New Zealand': 'NZ',
            'Nicaragua': 'NI',
            'Niger': 'NE',
            'Nigeria': 'NG',
            'Niue': 'NU',
            'Norfolk Island': 'NF',
            'Northern Mariana Islands': 'MP',
            'Norway': 'NO',
            'Oman': 'OM',
            'Pakistan': 'PK',
            'Palau': 'PW',
            'Palestinian Territory, Occupied': 'PS',
            'Panama': 'PA',
            'Papua New Guinea': 'PG',
            'Paraguay': 'PY',
            'Peru': 'PE',
            'Philippines': 'PH',
            'Pitcairn': 'PN',
            'Poland': 'PL',
            'Portugal': 'PT',
            'Puerto Rico': 'PR',
            'Qatar': 'QA',
            'Reunion': 'RE',
            'Romania': 'RO',
            'Russian Federation': 'RU',
            'Rwanda': 'RW',
            'Saint Barthelemy': 'BL',
            'Saint Helena': 'SH',
            'Saint Kitts And Nevis': 'KN',
            'Saint Lucia': 'LC',
            'Saint Martin': 'MF',
            'Saint Pierre And Miquelon': 'PM',
            'Saint Vincent And Grenadines': 'VC',
            'Samoa': 'WS',
            'San Marino': 'SM',
            'Sao Tome And Principe': 'ST',
            'Saudi Arabia': 'SA',
            'Senegal': 'SN',
            'Serbia': 'RS',
            'Seychelles': 'SC',
            'Sierra Leone': 'SL',
            'Singapore': 'SG',
            'Slovakia': 'SK',
            'Slovenia': 'SI',
            'Solomon Islands': 'SB',
            'Somalia': 'SO',
            'South Africa': 'ZA',
            'South Georgia And Sandwich Isl.': 'GS',
            'Spain': 'ES',
            'Sri Lanka': 'LK',
            'Sudan': 'SD',
            'Suriname': 'SR',
            'Svalbard And Jan Mayen': 'SJ',
            'Swaziland': 'SZ',
            'Sweden': 'SE',
            'Switzerland': 'CH',
            'Syrian Arab Republic': 'SY',
            'Taiwan': 'TW',
            'Tajikistan': 'TJ',
            'Tanzania': 'TZ',
            'Thailand': 'TH',
            'Timor-Leste': 'TL',
            'Togo': 'TG',
            'Tokelau': 'TK',
            'Tonga': 'TO',
            'Trinidad And Tobago': 'TT',
            'Tunisia': 'TN',
            'Turkey': 'TR',
            'Turkmenistan': 'TM',
            'Turks And Caicos Islands': 'TC',
            'Tuvalu': 'TV',
            'Uganda': 'UG',
            'Ukraine': 'UA',
            'United Arab Emirates': 'AE',
            'United Kingdom': 'GB',
            'United States': 'US',
            'United States Outlying Islands': 'UM',
            'Uruguay': 'UY',
            'Uzbekistan': 'UZ',
            'Vanuatu': 'VU',
            'Venezuela': 'VE',
            'Vietnam': 'VN',
            'Virgin Islands, British': 'VG',
            'Virgin Islands, U.S.': 'VI',
            'Wallis And Futuna': 'WF',
            'Western Sahara': 'EH',
            'Yemen': 'YE',
            'Zambia': 'ZM',
            'Zimbabwe': 'ZW'
            };
        let unitsArr = ["F", "C"]
        // probably want to switch this so I import the array
        let countries = Object.entries(isoCountries)
        const units = unitsArr.map( (x, i) => <option value={x} key={i}>{x}</option>)
        const ccode = countries.map( (x, i) => <option value={x} key={i}>{x.join("-")}</option>)
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange}/>
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