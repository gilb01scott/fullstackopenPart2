import React from 'react'

const CountryDetails = ({ country }) => {
  if (!country) return null

  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Area: {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {country.languages
          ? Object.values(country.languages).map(lang => (
              <li key={lang}>{lang}</li>
            ))
          : <li>No languages data</li>
        }
      </ul>

      <img
        src={country.flags?.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
    </div>
  )
}
 
export default CountryDetails
