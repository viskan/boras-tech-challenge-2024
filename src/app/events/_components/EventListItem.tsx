"use client"

import Link from "next/link";
import { type Event } from './Event'
import { ThumbsUp } from "lucide-react";

const EventListItem = ({event}: {event: Event}) => {
    return (
        <div className="flex border-b border-accent items-center justify-between">
            <Link className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20" href={`/events/${event.id}`}>
                <p>{event.name}</p>
            </Link>
            <div className="text-right flex pr-3">
                <ThumbsUp className="size-4 mr-1"/>
                <span className="text-xs">23</span>
            </div>
        </div>
    );
};

export default EventListItem;