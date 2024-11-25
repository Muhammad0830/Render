import axios from "axios"
import { useEffect, useState } from "react"


const CountryName = ( {country} ) => {
    const [weather, setWeather] = useState()

    useEffect(() => {
        if(country){
            console.log('fetching', country)
            axios
                .get(`http://api.openweathermap.org/data/2.5/find?appid=d62dc701d0fcae787552e1f042fc6124&q=${country.capital}`)
                .then(response => 
                    setWeather(response.data.list[0]))
        }
    }, [country])

    if(country == null){
        return null
    }

    country = country[0]

    const countryFlag = country.cca2.toLowerCase()

    const imgSrc = `https://flagcdn.com/w320/${countryFlag}.png`;

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>

            <h3>languages:</h3>

            <ul>
                {Object.entries(country.languages).map(p => (
                    <li key={p[0]}>{p[1]}</li>
                ))} 
            </ul>
            <div><img src={imgSrc} alt="flag" /></div>
            <h1>Weather of {country.capital}</h1>
            <div>temperature {(weather?.main.temp - 275).toFixed(0)}<sup>o</sup> Celcius</div>
            <div>wind {weather?.wind.speed} m/s</div>
        </div>
    )
}

export default CountryName