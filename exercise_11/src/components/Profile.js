import React from 'react'
import Weather from './Weather'

const Profile = ({ profile }) => {
  if (typeof profile.languages === 'undefined') {
    return <div></div>
  } else {
    return (
      <div>
        <h1>{profile.name}</h1>
        <div>capital {profile.capital}</div>
        <div>population {profile.population}</div>
        <h2>Spoken languages</h2>
        <ul>
          {profile.languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img src={`${profile.flag}`} alt='national flag' 
          width='30%' height='30%'
        />
        <Weather profile={profile}/>
      </div>
    )
  }
 
}

export default Profile