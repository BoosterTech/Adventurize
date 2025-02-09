import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "/data/cities.json";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        loading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown type of action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(BASE_URL);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error loading cities data",
        });
      }
    }
    fetchCities();
  }, []);

  // async function getCity(id) {
  //   if (currentCity?.id === id) return;
  //   console.log(typeof currentCity.id, typeof id);

  //   try {
  //     dispatch({ type: "loading" });
  //     const res = await fetch(`${BASE_URL}/cities/${id}`);
  //     const data = await res.json();
  //     dispatch({ type: "city/loaded", payload: data });
  //   } catch {
  //     dispatch({
  //       type: "rejected",
  //       payload: "there was an error loading city data",
  //     });
  //   }
  // }

  function getCity(id) {
    if (currentCity?.id === id) return; // Prevent re-fetching the same city

    const city = cities.find((city) => city.id === id);
    if (city) {
      dispatch({ type: "city/loaded", payload: city });
    } else {
      dispatch({ type: "rejected", payload: "City not found" });
    }
  }

  // async function createNewCity(newCity) {
  //   try {
  //     dispatch({ type: "loading" });
  //     const res = await fetch(`${BASE_URL}/cities`, {
  //       method: "POST",
  //       body: JSON.stringify(newCity),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     dispatch({ type: "city/created", payload: data });
  //   } catch {
  //     dispatch({
  //       type: "rejected",
  //       payload: "there was an error adding the new city. Try again",
  //     });
  //   }
  // }

  function createNewCity(newCity) {
    try {
      dispatch({ type: "loading" });

      // Get stored cities from Local Storage
      const storedCities = JSON.parse(localStorage.getItem("cities")) || cities;
      const updatedCities = [...storedCities, newCity];

      // Save updated list in Local Storage
      localStorage.setItem("cities", JSON.stringify(updatedCities));

      dispatch({ type: "city/created", payload: newCity });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error adding the new city. Try again.",
      });
    }
  }

  // async function deleteCity(id) {
  //   try {
  //     dispatch({ type: "loading" });
  //     await fetch(`${BASE_URL}/cities/${id}`, {
  //       method: "DELETE",
  //     });

  //     dispatch({ type: "city/deleted", payload: id });
  //   } catch {
  //     alert("there was an error deleting city");
  //   }
  // }

  function deleteCity(id) {
    try {
      dispatch({ type: "loading" });

      // Get stored cities from Local Storage (or fallback to the initial list)
      const storedCities = JSON.parse(localStorage.getItem("cities")) || cities;
      const updatedCities = storedCities.filter((city) => city.id !== id);

      // Save updated list back to Local Storage
      localStorage.setItem("cities", JSON.stringify(updatedCities));

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      alert("There was an error deleting the city.");
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createNewCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was use outside CitiesProvider ");
  return context;
}

export { CitiesProvider, useCities };
