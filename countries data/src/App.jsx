import React, { useState, useEffect } from 'react'
import SearchInput from './components/searchInput'
import CountryList from './components/countryList'
import CountryDetails from './components/countryDetails'
const App = () => {
  const [query, setQuery] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => res.json())
      .then(data => setAllCountries(data))
  }, [])

  const filteredCountries =
    query.length >= 2
      ? allCountries.filter(country =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        )
      : []
  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0])
    } else {
      setSelectedCountry(null)
    }
  }, [filteredCountries])
  const handleSelect = (name) => {
    setQuery(name)
  }

  return (
    <div>
      <h3>Find countries</h3>
      <SearchInput
        query={query}
        setQuery={setQuery}
        suggestions={filteredCountries.slice(0, 10)}
        onSelect={handleSelect}
      />

      {filteredCountries.length > 10 && (
        <p>Too many matches, refine your search</p>
      )}

      {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
        <CountryList
          countries={filteredCountries}
          onShow={handleSelect}
        />
      )}

      {filteredCountries.length === 1 && selectedCountry && (
        <CountryDetails country={selectedCountry} />
      )}

      {query.length >= 2 && filteredCountries.length === 0 && (
        <p>No matches found</p>
      )}
    </div>
  )
}

export default App