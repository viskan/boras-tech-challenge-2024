import Link from "next/link";

import { api } from "~/trpc/server";
import EventListItem from "~/app/events/_components/EventListItem";
import { CalendarPlus } from "lucide-react";

export default async function EventListPage() {
  const events = await api.event.getEvents();

  return (
    <main>
    <div className="h-4"/>
      <div className="flex justify-end">
        <Link href="events/new">
          <CalendarPlus className="m-2"/>
        </Link>
      </div>
      <div className="h-4"/>
      {events.map((event) => <EventListItem key={event.id} event={event}/>)}
    </main>
  );
}
