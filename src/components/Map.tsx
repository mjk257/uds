import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import * as d3 from "d3";

// Define the type for the props that the Map component will receive.
interface MapProps {
  cities: Array<{
    name: string;
    state: string;
    population: number;
    latitude: number;
    longitude: number;
  }>;
}

interface MapState {
  projection: any;
}

class Map extends Component<MapProps> {
  state: MapState = {
    projection: null,
  };

  async getCities() {
    try {
      const response = await axios.get("/api/cities/");
      if (response.status === 200) {
        const cities = response.data;
        this.renderMarkers(cities);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  svg: any;

  componentDidMount() {
    this.getCities();
    this.initializeMap();
    this.renderMarkers();
  }

  initializeMap() {
    // Define the dimensions of the SVG container
    const width = 800;
    const height = 600;

    // Create an SVG element for the map
    this.svg = d3
      .select("#map-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Create a projection function to convert from latitude and longitude to pixel coordinates
    const projection = d3
      .geoMercator()
      .center([0, 0])
      .scale(100)
      .translate([400, 300]);

    this.setState({ projection });
  }

  renderMarkers(cityData: any = []) {
    const { projection } = this.state;

    // Create circles as markers for each city
    this.svg
      .selectAll("circle")
      .data(cityData)
      .enter()
      .append("circle")
      .attr("cx", (d: any) => projection([d.longitude, d.latitude])?.[0])
      .attr("cy", (d: any) => projection([d.longitude, d.latitude])?.[1])
      .attr("r", 5) // Adjust the marker radius as needed
      .style("fill", "blue"); // Adjust marker style // Adjust marker style

    // Append tooltips to the markers if desired
    this.svg
      .selectAll("circle")
      .append("title")
      .text((d: any) => d.name);
  }

  render() {
    return (
      <div id="map-container" style={{ height: "400px", width: "100%" }}></div>
    );
  }
}

export default Map;
