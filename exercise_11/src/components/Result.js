import Profile from './Profile'

const Result = ({filteredCountries, setProfile, profile}) => {

  const handleShowChange = (event) => {
    setProfile(filteredCountries.filter(country => 
      country.name === event.target.id  
    )[0])
  }

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(country => 
          <div key={country.name}>
            <span>{country.name}</span> <button id={country.name} onClick={handleShowChange}>show</button>
          </div>
        )}
        <Profile profile={profile}/>
      </div>
    )
  } else if (filteredCountries.length === 1){
    return (
      <div>
        <Profile profile={filteredCountries[0]}/>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default Result