"use client";
import Link from "next/link";

import EventForm from "~/app/events/_components/EventForm";
import { EventType } from "~/app/events/_components/Event";
import { useRouter } from "next/navigation";
import {useState} from 'react'

import { api } from "~/trpc/react";

export default function NewEvent() {
  const router = useRouter();
  const createEvent = api.event.create.useMutation();
  const [event, setEvent] = useState<EventType>({ name: "", longitude:-1, latitude:-1, eventType: "IDEA"});
 
  const onClickEvent = async (e: EventType) => {
    const createdEvent = await createEvent.mutateAsync(e);
    router.push("/events/" + createdEvent.id);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <EventForm event={event} setEvent={setEvent}/>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => onClickEvent({ name: "name", longitude:1, latitude:2, eventType: "FUN_EVENT"})}
        >
          Save Event
        </button>
      </div>
    </main>
  );
}
