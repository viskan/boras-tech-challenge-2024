"use client";

import EventForm from "~/app/events/_components/EventForm";
import { type Event } from "~/app/events/_components/Event";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { LucidePlus } from "lucide-react";

export default function NewEvent() {
  const router = useRouter();
  const createEvent = api.event.create.useMutation();
  const [event, setEvent] = useState<Event>({
    name: "",
    longitude: 12.9398,
    latitude: 57.721,
    eventType: "FUN_EVENT",
    description: "",
    creatorId: "clw9lg9vx0001d03p870wfnoq",
  });
  const onClickEvent = async (e: Event) => {
    const tempEvent = {
      ...e,
      latitude: e.latitude,
      longitude: e.longitude,
      description: e.description,
    };
    const createdEvent = await createEvent.mutateAsync(tempEvent);
    router.push("/events/" + createdEvent.id);
  };
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4">
      <EventForm event={event} setEvent={setEvent} />
      <div className="flex items-center justify-center">
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg"
          onClick={() => onClickEvent(event)}
        >
          <LucidePlus size={24} />
        </button>
      </div>
    </div>
  );
}
