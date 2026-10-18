
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
  const [searched, setSearched] = useState(false);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [error, setError] = useState("");

  const getName = (item) => {
    if (typeof item === "string") {
      return item;
    }

    return item?.name || item?.state || item?.city || "";
  };

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStates() {
      try {
        setLoadingStates(true);
        const response = await fetch(`${API}/states`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load states.");
        }

        const data = await response.json();
        const items = Array.isArray(data) ? data : data.states || [];

        setStates(items);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not load states. Please refresh and try again.");
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

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity("");
      return undefined;
    }

    const controller = new AbortController();

    async function fetchCities() {
      try {
        setLoadingCities(true);
        setCities([]);
        setSelectedCity("");
        setError("");

        const response = await fetch(
          `${API}/cities/${encodeURIComponent(selectedState)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load cities.");
        }

        const data = await response.json();
        const items = Array.isArray(data) ? data : data.cities || [];

        setCities(items);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Could not load cities. Please select the state again.");
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

      const response = await fetch(`${API}/restaurants?${params}`);

      if (!response.ok) {
        throw new Error("Unable to fetch restaurants.");
      }

      const data = await response.json();
      const items = Array.isArray(data)
        ? data
        : data.restaurants || [];

      setRestaurants(items);
    } catch {
      setError(
        "Could not load restaurants. The server may take 50–60 seconds to respond. Please try again."
      );
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
            <div id="state">
              <label htmlFor="state-select">State</label>

              <select
                id="state-select"
                value={selectedState}
                onChange={(event) => {
                  setSelectedState(event.target.value);
                  setSearched(false);
                  setRestaurants([]);
                  setError("");
                }}
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

            <div id="city">
              <label htmlFor="city-select">City</label>

              <select
                id="city-select"
                value={selectedCity}
                onChange={(event) => {
                  setSelectedCity(event.target.value);
                  setSearched(false);
                  setRestaurants([]);
                  setError("");
                }}
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
            <h2>
              {restaurants.length} restaurants available in {selectedCity}
            </h2>
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
