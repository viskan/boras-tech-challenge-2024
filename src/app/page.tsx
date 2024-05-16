
import {env} from "~/env";
import MapContainer from "./map/_components/MapContainer";
import { api } from "~/trpc/server";
import MenuBar from "./menu-bar-test/_components/MenuBar";

export default async function Home() {
  const token = env.MAPBOX_ACCESS_TOKEN;
  // const events = await api.event.getEvents();
  return (
    <div className="realtive overflow-hidden">
      <div className="h-screen w-screen overflow-hidden">
        <MapContainer token={token} events={[]} />
      </div>
    </div>
  );
}

