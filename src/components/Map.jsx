import React from "react";
import styles from "../components/Map.module.css";
import { useSearchParams } from "react-router-dom";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h2>
        <p>Position:</p>
        <p>lat: {lat}</p>
        <p>lng: {lng}</p>
      </h2>
      <button onClick={() => setSearchParams({ lat: 19, lng: 50 })} >click</button>
    </div>
  );
};

export default Map;
