import Link from "next/link";

import { api } from "~/trpc/server";
import EventListItem from "~/app/events/_components/EventListItem";
import EventForm from "~/app/events/_components/EventForm";

type HomeProps = {
  params:{
    eventId:string
  }
};


export default async function Home({params}: HomeProps) {
  const event = await api.event.getEvent({id: Number(params.eventId) });
  
  return (    
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mt-0">
          <span className="text-[hsl(280,100%,70%)]">{event?.name}</span>
        </h1>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mt-0">
          {/* <span className="text-[hsl(280,100%,70%)]">{event?.likes} likes </span> */}
        </h1>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mt-0">
          {/* <span className="text-[hsl(280,100%,70%)]">Created by {event?.createdBy}</span> */}
        </h1>
      </div>
    </main>
  );
}

