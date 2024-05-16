import Link from "next/link";

import { api } from "~/trpc/server";
import EventListItem from "~/app/events/_components/EventListItem";

export default async function Home() {
  const events = await api.event.getEvents();

  return (    
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mt-0">
          <span className="text-[hsl(280,100%,70%)]">Events</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-8">
        {events.map((event, index) => (
        <EventListItem 
            key={index}
            name={event.name}
            createdBy={event.createdBy}
            likes={event.likes}
            sponsors={undefined}
            type={event.type}
            eventId={event.eventId}
          />
        ))}
        </div>
      </div>
    </main>
  );
}

