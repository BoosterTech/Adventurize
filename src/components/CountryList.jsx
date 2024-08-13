import React from "react";
import styles from "../components/CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";

const CountryList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add you first country by clicking on the map" />;

  const countries = cities.reduce((arr, city) => {
    // Check if the country is already included in the array
    if (!arr.map((el) => el.country).includes(city.country)) {
      // If not included, add the country and emoji to the array
      return [...arr, { country: city.country, emoji: city.emoji, id: city.id }];
    } else {
      // If included, return the array as is
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
};

export default CountryList;
