import Link from "next/link";

import { api } from "~/trpc/server";
import EventListItem from "~/app/events/_components/EventListItem";
import Event from "~/app/events/_components/Event";

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
        <Event
          key={params.eventId}
          name={event.name}
          createdBy={event.createdBy}
          likes={event.likes}
          sponsors={undefined}
          type={event.type}
        />
      </div>
    </main>
  );
}

