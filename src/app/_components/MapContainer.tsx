"use client";

import Map, { type MapRef, Marker } from "react-map-gl";
import { MoveRight } from "lucide-react";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { type Event } from "~/app/events/_components/Event";
import "mapbox-gl/dist/mapbox-gl.css";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import MapPin from "~/components/ui/map-pin";

interface MapContainerProps {
  token: string;
  events: inferRouterOutputs<AppRouter>["event"]["getEvents"];
  eventTypeForNew?: Event["eventType"];
  size: {
    width: string;
    height: string;
  };
  position?: {
    longitude: number;
    latitude: number;
  };
  onPositionChange?: (longitude:number, latitude:number) => void;
}

const MapContainer = ({ token, events, eventTypeForNew, size, position, onPositionChange }: MapContainerProps) => {
  const mapRef = useRef<MapRef>(null);
  console.log(position?.latitude)
  useEffect(() => {
    if (position) {
      mapRef.current?.flyTo({
        center: [position.longitude, position.latitude],
        zoom: 14
      });
    }
  }, [position, mapRef]);

  return (
    <Map
      ref={mapRef}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={token}
      initialViewState={{
        latitude: position?.latitude ?? 57.721,
        longitude: position?.longitude ?? 12.9398,
        zoom: 13,
      }}
      style={{ width: size.width, height: size.height }}
    >
      {events.map((event) => (
        <EventMarker key={event.id} event={event}/>
      ))}
      {eventTypeForNew && position && events.length === 0 && (
        <SelectionMarker
          eventType={eventTypeForNew}
          longitude={position.longitude}
          latitude={position.latitude}
          onPositionChange={onPositionChange}
        />
      )}
    </Map>
  );
};

export default MapContainer;

const EventMarker = ({ event , draggable = false}: { event: Event , draggable?: boolean}) => {
  return (
    <Dialog>
      <Marker
        key={event.id}
        latitude={event.latitude}
        longitude={event.longitude}
        anchor={"bottom"}
        draggable={draggable}
      >
          <DialogTrigger asChild>
            <span>
              <MapPin isClickable className="size-10" eventType={event.eventType} />
            </span>
          </DialogTrigger>
          <DialogContent>
            <h2 className="mb-2 text-xl font-bold">{event.name}</h2>
            <p>{event.description}</p>
            <Link href={`/events/${event.id}`} passHref className="flex">
              Go to Event <MoveRight />
            </Link>
            <DialogClose>Close</DialogClose>
          </DialogContent>
      </Marker>
    </Dialog>
  );
};

const SelectionMarker = ({
  eventType,
  longitude,
  latitude,
  onPositionChange
}: {
  eventType: Event["eventType"];
  longitude: number;
  latitude: number;
  onPositionChange?: (longitude:number, latitude:number) => void
}) => {
  return (
    <Marker
      draggable
      latitude={latitude}
      longitude={longitude}
      anchor={"bottom"}
      onDragEnd={(e) => onPositionChange?.(e.lngLat.lng, e.lngLat.lat)}
    >
      <MapPin eventType={eventType} className="cursor-pointer size-10" />
    </Marker>
  );
};
