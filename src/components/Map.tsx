import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

interface City {
  name: string;
  state: string;
  population: number;
  latitude: number;
  longitude: number;
}

interface MapProps {
  cities: City[];
}

const Map: React.FC<MapProps> = ({ cities }) => {
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/fwm25/clnxrvfh9007y01qshgob0qej",
      center: [-98.583333, 39.833333], // Center the map on the US
      zoom: 3, // Adjust the zoom level as needed
    });

    // Add markers for each city
    cities.forEach((city) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([city.longitude, city.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h3>${city.name}, ${city.state}</h3><p>Population: ${city.population}</p>`
          )
        )
        .addTo(map);

      // Create a label for the marker
      const label = document.createElement("div");
      label.className = "marker-label";
      label.innerHTML = city.name;

      // Add the label to the marker
      marker.getElement().appendChild(label);
    });

    // Clean up the map on unmount
    return () => map.remove();
  }, [cities]);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default Map;
