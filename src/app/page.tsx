import { env } from "~/env";
import MapContainer from "~/app/_components/MapContainer";
import { api } from "~/trpc/server";

export default async function Home() {
  const token = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const events = await api.event.getEvents();
  return (
    <div>
      <MapContainer token={token} events={events} size={{width: "100vw", height: "100vh"}} />
    </div>
  );
}
