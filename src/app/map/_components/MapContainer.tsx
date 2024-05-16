"use client";

import { useEffect, useRef, useState } from "react";
import { env } from "~/env";
import Map, { FullscreenControl, Marker } from "react-map-gl";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import { MapPin } from "lucide-react";

import 'mapbox-gl/dist/mapbox-gl.css';

interface MapContainerProps {
  token: string;
  events: inferRouterOutputs<AppRouter>["event"]["getEvents"];
}

function MapContainer({ token, events }: MapContainerProps) {
  //TODO: Add markers to the map when information is available
  return (

    <Map
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={token}
      initialViewState={{
        latitude: 57.721,
        longitude: 12.9398,
        zoom: 13,
      }} 
      style={{ width: "100vw", height: "100vh" }}
    >
      {events.map((event) => (
        <Marker
          key={event.id}
          latitude={event.lat}
          longitude={event.lon}
          anchor={"bottom"}
        >
          <MapPin size={24} />
        </Marker>
      ))}
    </Map>
  );
}

export default MapContainer;
