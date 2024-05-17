import Input from "~/app/_components/Input";
import MapContainer from "~/app/_components/MapContainer";
import { env } from "~/env";
import { api } from "~/trpc/server";
import CommentComponent from "../_components/CommentComponent";
import ThumbsUpComponent from "../_components/ThumbsUp";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import SponsorsComponent from "../_components/SponsorsComponent";
import MapPin from "~/components/ui/map-pin";
import getEventTypeTitle from "~/utils/event-type-title";
import { useEffect, useState } from "react";

type HomeProps = {
  params: {
    eventId: string;
  };
};

export default async function Home({ params }: HomeProps) {
  const session = await getServerAuthSession();
  const event = await api.event.getEvent({ id: Number(params.eventId) });
  const userOrganisations = await api.user.getOrganisations();

  if (!event) {
    return <div>Event not found</div>;
  }
  
  return (
    <div className="flex justify-center pb-6">
      <div className="w-full max-w-3xl rounded p-2">
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold">{event.name}</h2>
          <p className="mb-2 text-xs uppercase">
            {getEventTypeTitle(event.eventType)}
          </p>
          <p className="text-base text-gray-700">{event.description}</p>
        </div>

        <Divider title="Location" />

        <div className="h-60">
          <MapContainer
            token={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            events={[{ ...event }]}
            size={{ height: "100%", width: "100%" }}
            position={{ longitude: event.longitude, latitude: event.latitude }}
          />
        </div>
          <ThumbsUpComponent
            eventId={event.id}
            haveLiked={event.haveLiked}
            isLoggedIn={session !== null}
            likesCount={event.likesCount}
          />
        <div className="flex items-center justify-center">
          <Tabs defaultValue="comments" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
            </TabsList>
            <TabsContent value="comments">
              <CommentComponent session={session} event={event} />
            </TabsContent>
            <TabsContent value="sponsors">
              <SponsorsComponent session={session} event={event} userOrganisations={userOrganisations}/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const Divider = ({ title }: { title: string }) => (
  <>
    <div className="mt-10 flex justify-center">
      <div className="mb-2 text-xl font-bold">{title}</div>
    </div>
    <hr className="mx-auto mb-3 h-1 w-48 rounded border-0 bg-accent dark:bg-gray-700" />
  </>
);
