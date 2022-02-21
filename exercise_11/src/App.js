import axios from "axios";
import React, { useState, useEffect} from "react";
import Result from "./components/Result";

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchPrompt, setSearchPrompt] = useState('')
  const [profile, setProfile] = useState({})

  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log('promise fulfilled')
        // console.log(response)
        setCountries(response.data)
        // countries.push(response.data)
      })
  }, [])  // If the second parameter is an empty array [], then the effect is only run along with the first render of the component. (It just renders the component only once like componentDidMount.)
  // console.log('render', countries.length, 'countries')

  const handleSearchPromptChange = (event) => {
    setSearchPrompt(event.target.value)
    setProfile({})
    // console.log(search)
  }

  const filteredCountries = searchPrompt
    ? countries.filter(country => 
      country.name.toLowerCase().includes
      (searchPrompt.toLowerCase())
    )
    : []

  return (
    <div>
      find countries: <input 
        value={searchPrompt} onChange={handleSearchPromptChange}
      />
      <Result filteredCountries={filteredCountries} profile={profile} setProfile={setProfile}/>
      
    </div>
  )
}

export default App;
