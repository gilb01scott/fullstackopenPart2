import React from 'react'

const CountryList = ({ countries, onShow }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => onShow(country.name.common)}>
              show
            </button>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default CountryList