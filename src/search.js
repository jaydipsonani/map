import React, { useState, useEffect } from 'react';

const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    // Function to fetch countries based on search term
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    // Call API if search term has 2 or more characters
    if (searchTerm.length >= 2) {
      fetchCountries();
    } else {
      setFilteredCountries([]); // Clear the filtered list if less than 2 characters
    }
  }, [searchTerm]);

  // Filter countries based on the search term
  useEffect(() => {
    if (searchTerm.length > 2) {
      setFilteredCountries(
        countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, countries]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search countries"
      />

      {/* Show the list only if there's a search term with 2 or more characters */}
      {searchTerm.length > 2 && (
        <ul>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <li key={index}>{country.name.common}</li>
            ))
          ) : (
            <li>No countries found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CountrySearch;
