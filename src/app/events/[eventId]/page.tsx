import {ThumbsUp } from "lucide-react";
import Input from "~/app/_components/Input";
import MapContainer from "~/app/_components/MapContainer";
import { env } from "~/env";
import { api } from "~/trpc/server";
import CommentComponent from "../_components/CommentComponent";

type HomeProps = {
  params: {
    eventId: string;
  };
};

export default async function Home({ params }: HomeProps) {
  const event = await api.event.getEvent({ id: Number(params.eventId) });

  const handleThumbsUp = async () => {
      //await api.event.thumbsUp({ id: Number(params.eventId) });
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="flex w-full h-full justify-center">
      <div className="max-w-3xl overflow-hidden rounded shadow-lg">
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">{event.name}</div>
          <p className="text-base text-gray-700">{event.description}</p>
        </div>

        <Divider title="Location" />

        <div className="h-60">
          <MapContainer
            token={env.MAPBOX_ACCESS_TOKEN}
            events={[event]}
            size={{ height: "100%", width: "100%" }}
          />
        </div>
        <div className="flex justify-center mt-10">
          <div className="flex-initial">
            <ThumbsUp className="w-32"/>
          </div>
          <div className="flex-initial">
            123
          </div>
        </div>
        <Divider title="Comments" />
        <CommentComponent />
      </div>
    </div>
  );
}

const Divider = ({ title }: { title: string }) => (
  <>
    <div className="mt-10 flex justify-center">
      <div className="mb-2 text-xl font-bold">{title  }</div>
    </div>
    <hr className="mx-auto mb-3 h-1 w-48 rounded border-0 bg-accent dark:bg-gray-700" />
  </>
);