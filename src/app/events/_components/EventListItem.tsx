"use client"

import Link from "next/link";
import { ThumbsUp } from "lucide-react";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import MapPin from "~/components/ui/map-pin";

const EventListItem = ({event}: {event: inferRouterOutputs<AppRouter>["event"]["getEvents"][0]}) => {
    return (
        <div className="flex border-b border-accent items-center justify-between">
            <div className="flex items-center">
                <MapPin className="ml-2" eventType={event.eventType}/>
                <Link className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20" href={`/events/${event.id}`}>
                    <p>{event.name}</p>
                </Link>
            </div>
            {event.likesCount > 0 && (
                <div className="text-right flex pr-3">
                    <ThumbsUp className="size-4 mr-1"/>
                    <span className="text-xs">
                        {event.likesCount}
                    </span>
                </div>
            )}
        </div>
    );
};

export default EventListItem;