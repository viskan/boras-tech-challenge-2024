"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type Event, eventTypeKeys } from "./Event";
import Input from "../../_components/Input";
import MapContainer from "~/app/_components/MapContainer";
import { env } from "~/env.js";
import { capitalize } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface EventFormProps {
  event: Event;
  setEvent: Dispatch<SetStateAction<Event>>;
}

export default function EventForm({ event, setEvent }: EventFormProps) {
  const [lastCheckedAddress, setLastCheckedAddress] = useState("");
  const [address, setAddress] = useState({ address: "" });
  useEffect(() => {
    const dataFetch = async () => {
      try {
        if (lastCheckedAddress === address.address) {
          return;
        }
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.address}.json?proximity=ip&access_token=` +
            env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        );
        setLastCheckedAddress(address.address);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        const jsonData: {
          features: Array<{
            center: [number, number];
          }>;
        } = await response.json();

        const features = jsonData.features[0];
        if (features?.center[0]) {
          setEvent((prevState) => ({
            ...prevState,
            longitude: features.center[0],
            latitude: features.center[1],
          }));
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    void dataFetch();
  }, [setEvent, address.address]);
  
  const onChange = (value: string) => {
    setEvent((prevState) => ({
      ...prevState,
      eventType: value as Event["eventType"],
    }));
  };

  const onPositionChange = (longitude: number, latitude:number) => {
    setEvent((prevState) => ({
      ...prevState,
      longitude:longitude,
      latitude:latitude
    }));
  };
  return (
    <div className="w-full max-w-3xl rounded p-2 flex flex-col">
      <div className="px-6 py-4 w-[400px] self-center">
        <Input
          title=""
          placeholder="Name"
          object={event}
          setObject={setEvent}
          fieldKey="name"
          className="mb-2"
        />
        
        <Input
          title=""
          placeholder="Description"
          object={event}
          setObject={setEvent}
          fieldKey="description"
          className="mb-2"
        />
        <div className="w-full items-center justify-center max-w-[400px] mb-2">
          <Select onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Event Type" />
            </SelectTrigger>
            <SelectContent>
              {eventTypeKeys.map((option) => (
                <SelectItem key={option} value={option}>
                  {capitalize(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          title=""
          placeholder="Address"
          object={address}
          setObject={setAddress}
          fieldKey="address"
          className="mb-2"
        />
      </div>
      <div className="mt-5 h-60">
        <MapContainer
          token={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          events={[]}
          eventTypeForNew={event.eventType}
          position={{ longitude: event.longitude, latitude: event.latitude }}
          size={{ height: "100%", width: "100%" }}
          onPositionChange={onPositionChange}
        />
      </div>
    </div>
  );
}
