import Link from "next/link";

import { api } from "~/trpc/server";
import EventListItem from "~/app/events/_components/EventListItem";
import { CalendarPlus } from "lucide-react";
import Filter from "~/app/events/_components/Filter";

const EventListPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const events = await api.event.getEvents();
  const filteredEvents = events.filter(
    (event) => !searchParams.eventType || event.eventType === searchParams.eventType,
  );

  return (
    <main>
      <div className="h-4" />
      <div className="p-3 flex items-center justify-center">
        <Filter />
        <Link href="events/new">
          <CalendarPlus className="m-2" />
        </Link>
      </div>
      <div className="h-4" />
      {filteredEvents.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
      <div className="h-20"/>
    </main>
  );
};

export default EventListPage;
