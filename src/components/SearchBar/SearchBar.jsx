
import React from "react";
import "./SearchBar.css";

function SearchBar({
  states = [],
  cities = [],
  selectedState = "",
  selectedCity = "",
  onStateChange,
  onCityChange,
  onSearch,
  loadingStates = false,
  loadingCities = false,
  loading = false,
}) {
  const getName = (item) => {
    if (typeof item === "string") return item;
    return item?.name || item?.state || item?.city || "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) onSearch(event);
  };

  return (
    <form className="restaurant-search-bar" onSubmit={handleSubmit}>
      <div className="search-bar-field" id="state">
        <label htmlFor="search-state">State</label>
        <select
          id="search-state"
          value={selectedState}
          onChange={(event) =>
            onStateChange && onStateChange(event.target.value)
          }
          disabled={loadingStates}
          required
        >
          <option value="">
            {loadingStates ? "Loading states..." : "Select State"}
          </option>
          {states.map((item, index) => {
            const name = getName(item);
            return (
              <option key={`${name}-${index}`} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="search-bar-field" id="city">
        <label htmlFor="search-city">City</label>
        <select
          id="search-city"
          value={selectedCity}
          onChange={(event) =>
            onCityChange && onCityChange(event.target.value)
          }
          disabled={!selectedState || loadingCities}
          required
        >
          <option value="">
            {loadingCities ? "Loading cities..." : "Select City"}
          </option>
          {cities.map((item, index) => {
            const name = getName(item);
            return (
              <option key={`${name}-${index}`} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <button id="searchBtn" type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
