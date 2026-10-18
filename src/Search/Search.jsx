
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard";
import "./../App.css";

const API = "https://restaurantdata.onrender.com";

function Search() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const [searched, setSearched] = useState(false);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [error, setError] = useState("");

  const getName = (item) => {
    if (typeof item === "string") return item;
    return item?.name || item?.state || item?.city || "";
  };

  // Load states from the API.
  useEffect(() => {
    const controller = new AbortController();

    async function fetchStates() {
      try {
        setLoadingStates(true);

        const response = await fetch(`${API}/states`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load states");
        }

        const data = await response.json();
        const items = Array.isArray(data) ? data : data.states || [];
        const names = items.map(getName).filter(Boolean);

        setStates(names);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setStates([]);
          setError("Could not load states. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingStates(false);
        }
      }
    }

    fetchStates();

    return () => controller.abort();
  }, []);

  // Load cities whenever the selected state changes.
  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity("");
      setLoadingCities(false);
      return undefined;
    }

    const controller = new AbortController();

    async function fetchCities() {
      setLoadingCities(true);
      setCities([]);
      setSelectedCity("");
      setError("");

      try {
        const response = await fetch(
          `${API}/cities/${encodeURIComponent(selectedState)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load cities");
        }

        const data = await response.json();
        const items = Array.isArray(data) ? data : data.cities || [];
        const names = items.map(getName).filter(Boolean);

        if (!controller.signal.aborted) {
          setCities(names);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setCities([]);
          setError("Could not load cities. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCities(false);
        }
      }
    }

    fetchCities();

    return () => controller.abort();
  }, [selectedState]);

  const handleStateSelect = (name) => {
    setSelectedState(name);
    setSelectedCity("");
    setCities([]);
    setRestaurants([]);
    setSearched(false);
    setError("");
    setStateOpen(false);
    setCityOpen(false);
  };

  const handleCitySelect = (name) => {
    setSelectedCity(name);
    setRestaurants([]);
    setSearched(false);
    setError("");
    setCityOpen(false);
  };

  // Search for restaurants in the selected location.
  const handleSearch = async (event) => {
    event.preventDefault();

    if (!selectedState || !selectedCity) {
      setError("Please select both a state and a city.");
      return;
    }

    setLoadingRestaurants(true);
    setSearched(true);
    setRestaurants([]);
    setError("");

    try {
      const params = new URLSearchParams({
        state: selectedState,
        city: selectedCity,
      });

      const response = await fetch(
        `${API}/restaurants?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch restaurants");
      }

      const data = await response.json();
      const items = Array.isArray(data)
        ? data
        : data.restaurants || [];

      setRestaurants(items);
    } catch {
      setError("Could not load restaurants. Please try again.");
    } finally {
      setLoadingRestaurants(false);
    }
  };

  return (
    <>
      <NavBar />

      <main className="search-page container">
        <section className="search-controls">
          <h1>Find Restaurants</h1>

          <form onSubmit={handleSearch}>
            {/* State dropdown */}
            <div
              id="state"
              className="custom-location-dropdown"
              onClick={() => {
                setStateOpen(true);
                setCityOpen(false);
              }}
            >
              <label>State</label>

              <button
                type="button"
                className="location-dropdown-trigger"
                aria-expanded={stateOpen}
              >
                {selectedState ||
                  (loadingStates ? "Loading states..." : "Select State")}
              </button>

              {stateOpen && (
                <ul className="location-dropdown-options">
                  {states.map((name) => (
                    <li
                      key={name}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleStateSelect(name);
                      }}
                    >
                      {name}
                    </li>
                  ))}
                  {loadingStates && <li>Loading states...</li>}
                </ul>
              )}
            </div>

            {/* City dropdown */}
            <div
              id="city"
              className="custom-location-dropdown"
              onClick={() => {
                if (selectedState) {
                  setCityOpen(true);
                  setStateOpen(false);
                }
              }}
            >
              <label>City</label>

              <button
                type="button"
                className="location-dropdown-trigger"
                disabled={!selectedState}
                aria-expanded={cityOpen}
              >
                {selectedCity ||
                  (loadingCities ? "Loading cities..." : "Select City")}
              </button>

              {cityOpen && selectedState && (
                <ul className="location-dropdown-options">
                  {cities.map((name) => (
                    <li
                      key={name}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCitySelect(name);
                      }}
                    >
                      {name}
                    </li>
                  ))}

                  {loadingCities && <li>Loading cities...</li>}
                </ul>
              )}
            </div>

            <button
              id="searchBtn"
              type="submit"
              disabled={loadingRestaurants || loadingStates}
            >
              {loadingRestaurants ? "Searching..." : "Search"}
            </button>
          </form>

          {error && <p role="alert">{error}</p>}
        </section>

        <section
          className="restaurant-results"
          aria-live="polite"
          aria-busy={loadingRestaurants}
        >
          {loadingRestaurants && <p>Loading restaurants...</p>}

          {searched && !loadingRestaurants && !error && (
            <h1>
              {restaurants.length} restaurants available in {selectedCity}
            </h1>
          )}

          {searched &&
            !loadingRestaurants &&
            !error &&
            restaurants.length === 0 && (
              <p>No restaurants found in this city.</p>
            )}

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
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Search;
