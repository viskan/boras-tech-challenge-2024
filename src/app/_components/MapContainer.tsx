"use client";

import Map, { Marker } from "react-map-gl";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { type Event } from "~/app/events/_components/Event";

import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
 
interface MapContainerProps {
  token: string;
  events: inferRouterOutputs<AppRouter>["event"]["getEvents"];
  size: {
    width: string;
    height: string;
  };
  position?: {
    longitude:number,
    latitude:number
  }
}

const MapContainer = ({ token, events, size, position }: MapContainerProps) => {
  return (
    <>
    {position?.latitude}
    {position?.longitude}
    <Map
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={token}
      initialViewState={{
        latitude: 57.721,
        longitude: 12.9398,
        zoom: 13,
      }}
      viewState={{
        latitude: position?.latitude ? position.latitude : 57.721,
        longitude: position?.longitude ? position.longitude : 12.9398,
        zoom: 13,
        bearing:123,
        height: 123,
        padding: {
          bottom:0,
          left:0,
          right:0,
          top:0
        },
        pitch: 1,
        width: 123
      }}
      style={{ width: size.width, height: size.height }}
    >
      {events.map((event) => (
        <EventMarker key={event.id} event={event} />
      ))}
      {position && <SelectionMarker longitude={position.longitude} latitude={position.latitude}  />}
    </Map>
    </>
  );
};

export default MapContainer;

const EventMarker = ({ event }: { event: Event }) => {
  return (
    <Marker
      key={event.id}
      latitude={event.latitude}
      longitude={event.longitude}
      anchor={"bottom"}
    >
      <Link href={`/events/${event.id}`} passHref>
        <MapPin cursor="pointer" />
      </Link>
    </Marker>
  );
};

const SelectionMarker = ({longitude, latitude }: { longitude : number, latitude:number }) => {
  return (
    <Marker
      draggable
      latitude={latitude}
      longitude={longitude}
      anchor={"bottom"}
    >
    <MapPin cursor="pointer" />
    </Marker>
  );
};

const MapPin = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="46"
    height="46"
    viewBox="0 0 46 46"
    fill="none"
    stroke="#FF9D00"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-map-pin"
    {...props}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="#FF9D00" />
    <circle cx="12" cy="10" r="3" fill="#fff" />
  </svg>
);
