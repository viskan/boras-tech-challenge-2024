"use client";

import EventForm from "~/app/events/_components/EventForm";
import { type Event } from "~/app/events/_components/Event";
import { useRouter } from "next/navigation";
import {useState} from 'react'
import { api } from "~/trpc/react";

export default function NewEvent() {
  const router = useRouter();
  const createEvent = api.event.create.useMutation();
  const [event, setEvent] = useState<Event>({ name: "", longitude:-1, latitude:-1, eventType: "IDEA", description:"", creatorId:"clw9lg9vx0001d03p870wfnoq"});
  const onClickEvent = async (e: Event) => {
    const tempEvent = {
      ...e,
      latitude: 57.721,
      longitude: 12.9398,
      description: e.description,
      }
    const createdEvent = await createEvent.mutateAsync(tempEvent);
    router.push("/events/" + createdEvent.id);
  };
  return (
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <EventForm event={event} setEvent={setEvent}/>
        <button
          className="absolute bottom-5 rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-700"
          onClick={() => onClickEvent(event)}
        >
          Save Event
        </button>
      </div>
  );
}
