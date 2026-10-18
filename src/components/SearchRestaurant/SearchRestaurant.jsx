
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import "./SearchRestaurant.css";

function SearchRestaurant({
  states = [],
  cities = [],
  selectedState = "",
  selectedCity = "",
  onStateChange,
  onCityChange,
  onSearch,
  restaurants = [],
  loadingStates = false,
  loadingCities = false,
  loading = false,
  searched = false,
  error = "",
}) {
  return (
    <section className="search-restaurant-section">
      <div className="search-restaurant-heading">
        <p className="search-restaurant-eyebrow">DISCOVER LOCAL DINING</p>
        <h1>Find Restaurants Near You</h1>
        <p>
          Choose your state and city to discover restaurants and
          reserve your table.
        </p>
      </div>

      <SearchBar
        states={states}
        cities={cities}
        selectedState={selectedState}
        selectedCity={selectedCity}
        onStateChange={onStateChange}
        onCityChange={onCityChange}
        onSearch={onSearch}
        loadingStates={loadingStates}
        loadingCities={loadingCities}
        loading={loading}
      />

      {error && (
        <p className="search-restaurant-error" role="alert">
          {error}
        </p>
      )}

      {loading && (
        <p className="search-restaurant-message" role="status">
          Loading restaurants...
        </p>
      )}

      {searched && !loading && !error && (
        <div className="search-restaurant-results">
          <h2>
            {restaurants.length} restaurants available in {selectedCity}
          </h2>

          {restaurants.length === 0 ? (
            <p>No restaurants found in this city.</p>
          ) : (
            <div className="restaurant-list">
              {restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={
                    restaurant.id ||
                    restaurant.restaurantName ||
                    restaurant.name ||
                    index
                  }
                  restaurant={{
                    ...restaurant,
                    city: restaurant.city || selectedCity,
                    state: restaurant.state || selectedState,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default SearchRestaurant;
