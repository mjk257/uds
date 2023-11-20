import React, { useEffect, useRef, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox CSS
import supercluster from "supercluster"; // Import the supercluster library
import "../styles/index.scss";

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
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const cluster = useMemo(() => new supercluster(), []);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string;

    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement, // Update the container property here
      style: "mapbox://styles/fwm25/clnxrvfh9007y01qshgob0qej",
      center: [-98.583333, 39.833333],
      zoom: 3,
      maxBounds: [
        [-125.0, 24.396308], // Southwestern bound
        [-66.93457, 49.345786], // Northeastern bound
      ],
    });

    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      // Convert the cities to GeoJSON features
      const points = cities.map((city) => ({
        type: "Feature" as const,
        properties: {
          cluster: false,
          cityId: city.name,
          category: city.state,
        },
        geometry: {
          type: "Point" as const,
          coordinates: [city.longitude, city.latitude],
        },
      }));

      // Load the points into the Supercluster
      cluster.load(points);

      // Get all clusters
      const bbox: [number, number, number, number] = [-180, -85, 180, 85];
      const zoom = map.current?.getZoom() || 0;
      const clusters = cluster.getClusters(bbox, zoom);

      // Add clusters to the map
      map.current?.addSource("clusters", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: clusters,
        },
      });

      // Add cluster and uncluster layers
      map.current?.addLayer({
        id: "clusters",
        type: "circle",
        source: "clusters",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#007cbf",
          "circle-radius": 18,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
        layout: {
          visibility: "visible", // Make sure the cluster layer is visible
        },
      });

      map.current?.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "clusters",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
          visibility: "visible",
        },
      });

      map.current?.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "clusters",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#007cbf",
          "circle-radius": 10,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
        layout: {
          visibility: "visible", // Make sure the cluster layer is visible
        },
      });

      ["clusters", "unclustered-point"].forEach((layer) => {
        map.current?.on("mouseenter", layer, () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "pointer";
          }
        });

        map.current?.on("mouseleave", layer, () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = "";
          }
        });
      });

      map.current?.on("zoomend", () => {
        const zoom = map.current?.getZoom() || 0;
        const clusters = cluster.getClusters(bbox, zoom);

        if (map.current?.getSource("clusters")) {
          const source = map.current.getSource(
            "clusters"
          ) as mapboxgl.GeoJSONSource;
          source.setData({
            type: "FeatureCollection",
            features: clusters,
          });
        }
      });

      // Handle marker click

      map.current?.on("click", "clusters", (e) => {
        const features = map.current?.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features?.[0]?.properties?.cluster_id;
        const clickedCluster = clusterId
          ? cluster.getLeaves(clusterId, Infinity)
          : null;

        if (clickedCluster) {
          const coordinates = clickedCluster[0].geometry.coordinates as [
            number,
            number
          ];

          map.current?.easeTo({
            center: coordinates,
            zoom: map.current?.getZoom() + 1,
          });
        }
      });

      map.current?.on("click", "unclustered-point", (e) => {
        const cityName = e.features?.[0]?.properties?.name;
        if (cityName) {
          onMarkerClick(cityName);
        }
      });
    });

    // Clean up the map on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [cities]);

  return (
    <div id="map-container">
      <div ref={mapContainer} id="map" className="map-container" />
    </div>
  );
};

export default Map;
