"use client";

import { useEffect, useRef, useState } from "react";
import { env } from "~/env";
import Map, { FullscreenControl, Marker } from "react-map-gl";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import { MapPin } from "lucide-react";
import { EventType } from "~/app/events/_components/Event";

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
        <EventMarker key={event.id} event={event} />
      ))}
    </Map>
  );
}

export default MapContainer;

function EventMarker({ event }: { event: EventType }) {
  return (
    <Marker
      key={event.eventId}
      latitude={event.latitude}
      longitude={event.longitude}
      anchor={"bottom"}
    >
      <MapPin size={24} cursor="pointer"/>
    </Marker>
  );
}