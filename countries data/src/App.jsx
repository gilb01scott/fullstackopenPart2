import React, { useState, useEffect } from 'react'

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
      ? allCountries.filter(c =>
          c.name.common.toLowerCase().includes(query.toLowerCase())
        )
      : []

  const handleSelect = (name) => {
    setQuery(name)

    const found = allCountries.find(
      c => c.name.common.toLowerCase() === name.toLowerCase()
    )

    setSelectedCountry(found || null)
  }

  useEffect(() => {
    if (filteredCountries.length !== 1) {
      setSelectedCountry(null)
    }
  }, [query])

  const isSingle = filteredCountries.length === 1

  return (
    <div style={{ padding: '10px' }}>
      
      {/* INPUT + SUGGESTIONS */}
      <div style={{ position: 'relative', width: '250px' }}>
        <h3>Find countries </h3> <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search countries..."
          style={{ width: '100%' }}
        />

        {query.length >= 2 && !selectedCountry && filteredCountries.length > 0 && filteredCountries.length <= 10 && (
          <div
            style={{
              position: 'absolute',
              background: 'white',
              border: '1px solid #ccc',
              width: '100%',
              zIndex: 10
            }}
          >
            {filteredCountries.slice(0, 10).map(country => (
              <div
                key={country.name.common}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px',
                  borderBottom: '1px solid #eee'
                }}
              >
                <span>{country.name.common}</span>

                <button onClick={() => handleSelect(country.name.common)}>
                  show
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {filteredCountries.length > 10 && !selectedCountry && (
        <p>Too many matches, refine search</p>
      )}

      {filteredCountries.length > 1 && filteredCountries.length <= 10 && !selectedCountry && (
        <div>
          {filteredCountries.map(country => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleSelect(country.name.common)}>
                show
              </button>
            </div>
          ))}
        </div>
      )}

      {/* DETAILS VIEW (HIGHEST PRIORITY) */}
      {selectedCountry && (
        <div style={{ marginTop: '20px' }}>
          <h2>{selectedCountry.name.common}</h2>

          <p>Capital: {selectedCountry.capital?.[0]}</p>
          <p>Area: {selectedCountry.area}</p>

          <h3>Languages</h3>
          <ul>
            {selectedCountry.languages &&
              Object.values(selectedCountry.languages).map(lang => (
                <li key={lang}>{lang}</li>
              ))}
          </ul>

          <img
            src={selectedCountry.flags?.png}
            alt="flag"
            width="150"
          />
        </div>
      )}

      {query.length >= 2 && filteredCountries.length === 0 && !selectedCountry && (
        <p>No matches found</p>
      )}
    </div>
  )
}

export default App