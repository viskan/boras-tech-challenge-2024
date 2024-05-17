"use client";

import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { type Event, eventTypeKeys } from "./Event";
import Input from "../../_components/Input";
import MapContainer from "~/app/_components/MapContainer";
import { env } from "~/env.js";

interface EventFormProps {
  event: Event;
  setEvent: Dispatch<SetStateAction<Event>>;
}

export default function EventForm({ event, setEvent }: EventFormProps) {
  const [address, setAddress] = useState({ address: "" });
  useEffect(() => {
    const dataFetch = async () => {
      try {

        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.address}.json?proximity=ip&access_token=` + env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        );
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
  }, [setEvent, address]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setEvent((prevState) => ({
      ...prevState,
      eventType: newValue as Event["eventType"],
    }));
  };

  return (
    <div className="w-full max-w-3xl rounded p-2">
      <div className="px-6 py-4">
        <h2 className="mb-2 text-xl font-bold">{event.name}</h2>
        <p className="text-base text-gray-700">{event.description}</p>
        <Input
          title=""
          placeholder="Name"
          object={event}
          setObject={setEvent}
          fieldKey="name"
        />
        <Input
          title=""
          placeholder="Description"
          object={event}
          setObject={setEvent}
          fieldKey="description"
        />
        <div className="flex items-center justify-center">
          <select
            onChange={onChange}
            className="w-full max-w-md rounded-md border px-3 py-2 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {eventTypeKeys.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <Input
          title=""
          placeholder="Address"
          object={address}
          setObject={setAddress}
          fieldKey="address"
        />
      </div>
      <div className="mt-5 h-60">
        <MapContainer
          token={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          events={[]}
          eventTypeForNew={event.eventType}
          position={{ longitude: event.longitude, latitude: event.latitude }}
          size={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
}
