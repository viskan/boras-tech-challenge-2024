"use client";

import React from "react";
import { type inferRouterOutputs } from "@trpc/server";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "~/app/_components/Input";
import { Button } from "~/components/ui/button";
import { type AppRouter } from "~/server/api/root";

import { type getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

interface SponsorsComponentProps {
  event: inferRouterOutputs<AppRouter>["event"]["getEvent"];
  session: Awaited<ReturnType<typeof getServerAuthSession>>;
  userOrganisations: inferRouterOutputs<AppRouter>["user"]["getOrganisations"];
}

function SponsorsComponent({event, session, userOrganisations}: SponsorsComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sponsorship, setSponsorship] = useState({comment: "", dummmyId: 0});
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
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
    await addSponsorship.mutateAsync({eventId: event.id, comment: sponsorship.comment, ...(selectedOrgId ? {orgId: selectedOrgId} : {})});
    setSponsorship(prev => ({...prev, sponsorship: ""}));
    setIsDialogOpen(false);
    setSponsorship({comment: "", dummmyId: sponsorship.dummmyId + 1});
    router.refresh();
  };

  // const openSelectSponsorDialog = () => {
    

  const handleDelete = async (sponsorshipId: number) => {
    await deleteSponsorship.mutateAsync({sponsorShipId: sponsorshipId});
  }

  return (
    <div className="flex flex-col">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {session && (
          <div className="my-2 flex w-full items-center">
            <div className="bg-red flex-grow">
              <Input
                key={sponsorship.dummmyId}
                object={sponsorship}
                placeholder="Sponsor event..."
                setObject={setSponsorship}
                fieldKey="comment"
                title=""
              />
            </div>
              <Button disabled={sponsorship.comment .trim().length === 0} onClick={() => setIsDialogOpen(true)}
              >Sponsor event</Button>
          </div>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How do you want to sponsor this event?</DialogTitle>
            <DialogDescription>
              Choose the organization that you want to sponsor this event with or
              sponsor it as an individual.
              <div className="mt-2">
                <Select onValueChange={(value) => {
                  if (value === "PRIVATE_PERSON") {
                    setSelectedOrgId(null);
                    console.log("selectedOrgId", null);
                    return;
                  }
                  const orgId = parseInt(value);
                  setSelectedOrgId(orgId);
                  console.log("selectedOrgId", orgId);
                }}>
                  <SelectTrigger className="w-full px-2">
                    <SelectValue placeholder={session?.user.name ?? "No name specified"}/>
                  </SelectTrigger>
                  <SelectContent>
                    {session?.user.name && (
                      <SelectItem
                        value={"PRIVATE_PERSON"}
                        onClick={() => setSelectedOrgId(null)}
                      >
                        {session?.user.name}
                      </SelectItem>
                    )}
                    {userOrganisations.map((org) => (
                      <SelectItem
                        key={org.id}
                        value={org.id.toString()}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedOrgId(org.id);
                        }}
                      >
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit} >Sponsor event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col">
        {event.sponsorships.length === 0 && <div>No Sponsors</div>}
        {event.sponsorships.map((sponsorship) => (
          <div
            key={sponsorship.id}
            className="m-2 flex items-center rounded-3xl bg-muted p-2"
          >
            <div className="bg-red flex-grow">
              <div className="font-semibold">
                {sponsorship.organization?.banner && (
                  <img src={`data:image/jpeg;base64,${sponsorship.organization?.banner}`} />
                )}
                {sponsorship.organization?.name ??
                  sponsorship.user?.name ??
                  "Anonymous user"}
              </div>
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