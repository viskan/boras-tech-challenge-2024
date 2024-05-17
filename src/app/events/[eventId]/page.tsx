import Input from "~/app/_components/Input";
import MapContainer from "~/app/_components/MapContainer";
import { env } from "~/env";
import { api } from "~/trpc/server";
import CommentComponent from "../_components/CommentComponent";
import ThumbsUpComponent from "../_components/ThumbsUp";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from 'next/navigation'

type HomeProps = {
  params: {
    eventId: string;
  };
};

export default async function Home({ params }: HomeProps) {
  const session = await getServerAuthSession();
  const event = await api.event.getEvent({ id: Number(params.eventId) });

  if (!session) {
    redirect("/login");
    return;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="flex h-[80vh] w-full justify-center pb-6 overflow-hidden">
      <div className="max-w-3xl rounded overflow-scroll overflow-x-hidden p-2">
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">{event.name}</div>
          <p className="text-base text-gray-700">{event.description}</p>
        </div>

        <Divider title="Location" />

        <div className="h-60">
          <MapContainer
            token={env.MAPBOX_ACCESS_TOKEN}
            events={[{ ...event }]}
            size={{ height: "100%", width: "100%" }}
          />
        </div>
        <div className="mt-10 flex items-center justify-center">
          <ThumbsUpComponent eventId={event.id} haveLiked={event.haveLiked} />
          <div className="items-center justify-center text-center">
            <p className="mr-2 text-3xl">{event.likesCount}</p>
          </div>
        </div>
        <Divider title="Comments" />
        <CommentComponent session={session} event={event} />
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
