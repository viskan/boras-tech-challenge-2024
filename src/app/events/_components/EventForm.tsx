import { type Dispatch, type SetStateAction , useEffect} from "react";
import { type Event, eventTypeKeys } from "./Event";
import { env } from "~/env";
import Input from "../../_components/Input";
import MapContainer from "~/app/_components/MapContainer";

interface EventFormProps {
  event: Event;
  setEvent: Dispatch<SetStateAction<Event>>;
}
export default function EventForm({ event, setEvent }: EventFormProps) {
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
            token={"pk.eyJ1IjoibWFoYW4tYXQtYnRjIiwiYSI6ImNsdzlibmttaTAyNnEyaW15N3hyNjY3eXQifQ.bWe0T8XuqS4ajdcJ3WTQRQ"}
            events={[]}
            size={{ height: "100%", width: "100%" }}
          />
        </div>
    </div>
  );
}
