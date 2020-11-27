import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import L from "leaflet";
import axios from "axios";

import Layout from "components/Layout";
import Map from "components/Map";

import { Flex, useRadio, Box, useRadioGroup, HStack } from "@chakra-ui/react";

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;

const IndexPage = () => {
  const mapRef = useRef();
  const [geoJson, setGeoJson] = useState();

  useEffect(() => {
    let response;

    const fetchData = async () => {
      try {
        response = await axios.get("https://corona.lmao.ninja/v2/countries");
      } catch (e) {
        console.log("E", e);
        return;
      }

      const { data } = response;
      const hasData = Array.isArray(data) && data.length > 0;

      if (!hasData) return;

      const dataJson = {
        type: "FeatureCollection",
        features: data.map((country = {}) => {
          const { countryInfo = {} } = country;
          const { lat, long: lng } = countryInfo;
          return {
            type: "Feature",
            properties: {
              ...country,
            },
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
          };
        }),
      };

      setGeoJson(dataJson);
    };

    fetchData();
  }, []);

  function mapEffect({ leafletElement: map } = {}) {
    if (!map) return;

    var layerGroup = L.layerGroup().addTo(map);

    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;
        let updatedFormatted;
        let casesString;

        const { country,
        updated,
        cases,
        deaths,
        recovered,
        active } = properties

        casesString = `${cases}`;

        if (cases > 1000000) {
          casesString = `${casesString.slice(0, -6)}M+`;
        } else if (cases > 1000) {
          casesString = `${casesString.slice(0, -3)}K+`;
        }
        if (updated) {
          updatedFormatted = new Date(updated).toLocaleString();
        }

        const html = `
              <h2>${country}<h2>
              <ul>
                <li><strong>Confirmed:</strong> ${cases}</li>
                <li><strong>Deaths:</strong> ${deaths}</li>
                <li><strong>Recovered:</strong> ${recovered}</li>
                <li><strong>Last Update:</strong> ${updatedFormatted}</li>
              </ul>
        `;

        const rad = Math.sqrt(cases/10000 + 5)

        return new L.circleMarker(latlng, {
          radius: rad,
          fillColor: "#C53030",
          stroke: false,
          weight: 1,
          opacity: 0,
          fillOpacity: 0.7,
          riseOnHover: true,
        }).bindTooltip(html, {
          className: "icon-marker-tooltip",
          direction: "top",
          opacity: 1,
          backgroundColor: "#171923",
        });
      },
    });

    geoJsonLayers.addTo(layerGroup);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "Mapbox",
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>COVID Dashboard</title>
      </Helmet>

      <Map ref={mapRef} {...mapSettings} />

      <Flex w="100%" bg="gray.900" h="100px">
      </Flex>
    </Layout>
  );
};

export default IndexPage;
