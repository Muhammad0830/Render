import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryName from './components/country'
import Names from './components/names'


const App = () => {
  const [value, setValue] = useState('')
  const [names, setNames] = useState(null)
  const [countryList, setCountryList] = useState([])
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('effect run, countryList is now', countryList)

    if(countryList) {
      console.log('fetching exchange names...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          console.log('response', response.data)
          setCountryList(response.data)
        })
    }
  }, [])

  const handleInput = (event) => {
    setValue(event.target.value);
    console.log(event.target.value)
  }

  const handleShow = (name) => {
    setCountry(countryList.filter(c => c.name.common.includes(name)))
    setValue('')
    setNames()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedNames = countryList.map(c => c.name.common).filter(c => c.toLowerCase().includes(value.toLowerCase()));
    if(updatedNames.length > 10){
      setNames('too many countries, specify another filter')   
      setCountry(null)  
    } else if(updatedNames.length > 1 && updatedNames.length <= 10){
      console.log('names', updatedNames.length)
      setNames(updatedNames)
      setCountry(null)  
    } else if(updatedNames.length == 1) {
      setNames()
      setCountry(countryList.filter(c => c.name.common.includes(updatedNames)))
    } else {
        setCountry(null)
        setNames(0)
      }
      console.log('names', updatedNames)
      console.log('countryList', countryList.filter(c => c.name.common.includes(updatedNames)))
      console.log('submitting...')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>find countries</span>
        <input type="text" onChange={handleInput} value={value}/>
        <button type='submit'>search</button>
      </form>
      <pre>
        <Names names={names} countryList={countryList} handleShow={handleShow}/>
        <CountryName country={country}/> 
      </pre>
      
    </div>
  )
}

export default App