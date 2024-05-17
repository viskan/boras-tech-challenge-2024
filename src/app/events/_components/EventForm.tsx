import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type Event, eventTypeKeys } from "./Event";
import { env } from "~/env";
import Input from "../../_components/Input";
import MapContainer from "~/app/_components/MapContainer";

interface EventFormProps {
  event: Event;
  setEvent: Dispatch<SetStateAction<Event>>;
}
interface MapProps {
  position?: {
    longitude: number;
    latitude: number;
  };
}
export default function EventForm({ event, setEvent }: EventFormProps) {
  const [position, setPosition] = useState<MapProps>({ position: undefined });
  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/kristineberg.json?proximity=ip&access_token=pk.eyJ1IjoibWFoYW4tYXQtYnRjIiwiYSI6ImNsdzlibmttaTAyNnEyaW15N3hyNjY3eXQifQ.bWe0T8XuqS4ajdcJ3WTQRQ`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        const jsonData: { features: any } = await response.json();
        console.log("hej");
        setPosition({
          position: { longitude: 12.9420561305697, latitude: 57.721301650499 },
        });
        return jsonData;
      } catch (error) {
        console.error("error", error);
      }
    };

    void dataFetch();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setEvent((prevState) => ({
      ...prevState,
      eventType: newValue as Event["eventType"],
    }));
  };
  return (
    <div className="max-w-3xl overflow-hidden rounded">
      <h1 className="p-6 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-accent">
          {event.name ? event.name : "My New Event"}
        </span>
      </h1>
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
          className="focus:shadow-outline flex h-10 w-64 appearance-none justify-center rounded-lg border pl-3 pr-6 text-center text-base text-black placeholder-gray-600"
        >
          {eventTypeKeys.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-5 h-60">
        <MapContainer
          token={
            "pk.eyJ1IjoibWFoYW4tYXQtYnRjIiwiYSI6ImNsdzlibmttaTAyNnEyaW15N3hyNjY3eXQifQ.bWe0T8XuqS4ajdcJ3WTQRQ"
          }
          events={[]}
          position={position.position}
          size={{ height: "100%", width: "100%" }}
        />
      </div>
      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
        +
      </button>
    </div>
  );
}
