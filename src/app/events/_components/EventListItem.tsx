"use client"

import {  } from "react";
import Link from "next/link";

type Sponsor  = {
    userId?: number,
    organizationId?: number,
    name: string,
  };

type Event = {
    eventId:number,
    name: string,
    createdBy: number,
    likes: number,
    eventType: string,
    sponsors?: Sponsor[]
  };
  

const EventListItem = (event: Event) => {
    console.log(event);
    return (
        <Link
            key={1}
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href={"/events/" +  event.eventId} 
             >
            <h3 className="text-2xl font-bold">{event.name}</h3>
            <div className="text-lg">
            </div>
        </Link>
    );
};

export default EventListItem;