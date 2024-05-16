"use client";

import { useEffect, useRef, useState } from "react";
import { env } from "~/env";
import Map, { Marker } from 'react-map-gl';
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import { MapPin } from "lucide-react";

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
    >
      <Marker longitude={12.9398} latitude={57.721} anchor={"bottom"} >
        <MapPin size={200} />
      </Marker>
    </Map>
  );
}

export default MapContainer;
