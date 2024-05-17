"use client";

import React from "react";
import { inferRouterOutputs } from "@trpc/server";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "~/app/_components/Input";
import { Button } from "~/components/ui/button";
import { AppRouter } from "~/server/api/root";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/react";

interface SponsorsComponentProps {
  event: inferRouterOutputs<AppRouter>["event"]["getEvent"];
  session: Awaited<ReturnType<typeof getServerAuthSession>>;
}

function SponsorsComponent({event, session}: SponsorsComponentProps) {
  const [sponsorship, setSponsorship] = useState({comment: ""});
  const router = useRouter();

  const addSponsorship = api.event.sponsorEvent.useMutation({
    onSuccess: () => {
      router.refresh();
    }
  });

  const deleteSponsorship = api.event.unSponsorEvent.useMutation({
    onSuccess: () => {
      router.refresh();
    }
  });
  
  if (!event) return null;


  const handleSubmit = async () => {
    if (!sponsorship.comment) return;
    await addSponsorship.mutateAsync({eventId: event.id, comment: sponsorship.comment});
    setSponsorship(prev => ({...prev, sponsorship: ""}));
  };

  const handleDelete = async (sponsorshipId: number) => {
    await deleteSponsorship.mutateAsync({sponsorShipId: sponsorshipId});
  }

  return (
      <div className="flex flex-col">
        {session && (
          <div className="flex w-full items-center my-2">
            <div className="bg-red flex-grow">
              <Input
                object={sponsorship}
                placeholder="Add a comment..."
                setObject={setSponsorship}
                fieldKey="comment"
                title=""
              />
            </div>
            <Button onClick={handleSubmit}>Sponsor event</Button>
          </div>
        )}
        <div className="flex flex-col">
          {event.sponsorships.length === 0 && <div>No Sponsors</div>}
          {event.sponsorships.map((sponsorship) => (
            <div
              key={sponsorship.id}
              className="m-2 flex items-center rounded-3xl bg-muted p-2"
            >

              <div className="bg-red flex-grow">
                <div className="font-semibold">{sponsorship.organization?.name ?? sponsorship.user?.name ?? "Anonymous user"}</div>
                <div>{sponsorship.comment}</div>
              </div>
              <div>
                {session && sponsorship.userId === session.user.id && (
                  <TrashIcon
                    cursor={"pointer"}
                    onClick={() => handleDelete(sponsorship.id)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default SponsorsComponent;