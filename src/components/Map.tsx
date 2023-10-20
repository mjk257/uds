import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "../styles/index.scss"; // Import the CSS file

interface City {
  name: string;
  state: string;
  population: number;
  latitude: number;
  longitude: number;
}

interface MapProps {
  cities: City[];
  onMarkerClick: (cityName: string) => void;
}

const Map: React.FC<MapProps> = ({ cities, onMarkerClick }) => {
  const US_BOUNDS = {
    west: -125.0, // The westernmost point of the U.S.
    south: 24.396308, // The southernmost point of the U.S.
    east: -66.93457, // The easternmost point of the U.S.
    north: 49.345786, // The northernmost point of the U.S.
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN as string;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/fwm25/clnxrvfh9007y01qshgob0qej",
      center: [-98.583333, 39.833333], // Center the map on the US
      zoom: 3, // Adjust the zoom level as needed
      maxBounds: [
        [US_BOUNDS.west, US_BOUNDS.south], // Southwestern bound
        [US_BOUNDS.east, US_BOUNDS.north], // Northeastern bound
      ],
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

      // Set the city's name as the marker's unique identifier
      marker.getElement().setAttribute("data-city-name", city.name);

      // Create a label for the marker
      const label = document.createElement("div") as HTMLElement;
      label.className = "marker-label";
      label.innerHTML = city.name;

      // Add the label to the marker
      marker.getElement().appendChild(label);

      // Add a click event listener to the marker
      marker.getElement().addEventListener("click", (e) => {
        const cityName = marker.getElement().getAttribute("data-city-name");
        if (cityName) {
          onMarkerClick(cityName); // Call the function to open the response card
        }
      });
    });

    // Clean up the map on unmount
    return () => map.remove();
  }, [
    US_BOUNDS.east,
    US_BOUNDS.north,
    US_BOUNDS.south,
    US_BOUNDS.west,
    cities,
    onMarkerClick,
  ]);

  return (
    <div id="map-container">
      <div id="map" />
    </div>
  );
};

export default Map;
