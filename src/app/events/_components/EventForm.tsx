"use client";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type Event, eventTypeKeys } from "./Event";
import Input from "../../_components/SmartInput";

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
    <div className="max-w-3xl overflow-hidden rounded shadow-lg">
        <h1 className="mt-0 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">
            {event.name ? event.name : "My New Event"}
          </span>
        </h1>
        <Input title="" object={event} setObject={setEvent} fieldKey="name" />
        <Input
          title=""
          object={event}
          setObject={setEvent}
          fieldKey="description"
        />
        <select
          onChange={onChange}
          className="text-center focus:shadow-outline h-10 w-full appearance-none rounded-lg border pl-3 pr-6 text-base text-black placeholder-gray-600"
        >
          {eventTypeKeys.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
    </div>
  );
}
