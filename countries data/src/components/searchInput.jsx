import React from 'react'

const SearchInput = ({ query, setQuery, suggestions = [], onSelect }) => {
  return (
    <div style={{ position: 'relative' }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search countries..."
      />

      {query.length >= 2 && suggestions.length > 1 && suggestions.length <= 10 && (
        <div
          style={{
            position: 'absolute',
            background: 'white',
            border: '1px solid #ccc',
            width: '220px',
            zIndex: 10
          }}
        >
          {suggestions.map(country => (
            <div
              key={country.name.common}
              onClick={() => onSelect(country.name.common)}
              style={{
                padding: '6px',
                cursor: 'pointer'
              }}
            >
              {country.name.common}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchInput