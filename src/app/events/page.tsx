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
    (event) => !searchParams.event || event.eventType === searchParams.event,
  );

  //console.log(" searchParams.eventType", searchParams);
  //console.log("events", events);
  console.log("filteredEvents", filteredEvents);

  return (
    <main>
      <Filter />
      <div className="h-4" />
      <div className="flex justify-end">
        <Link href="events/new">
          <CalendarPlus className="m-2" />
        </Link>
      </div>
      <div className="h-4" />
      {filteredEvents.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </main>
  );
};

export default EventListPage;
