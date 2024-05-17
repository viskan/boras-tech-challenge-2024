"use client";

import { type inferRouterOutputs } from "@trpc/server";
import { CircleX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Input from "~/app/_components/Input";
import { Button } from "~/components/ui/button";
import { type AppRouter } from "~/server/api/root";
import { api } from "~/trpc/react";

type EditOrganizationProps = {
    organization: inferRouterOutputs<AppRouter>["organization"]["getById"];
}

const EditOrganization = ({organization}: EditOrganizationProps) => {
    const [data, setData] = useState({name: organization.name});
    const saveOrganization = api.organization.saveOrganization.useMutation();
    const onSave = async () => {
        await saveOrganization.mutateAsync({
            organizationId: organization.id,
            ...data,
        });
    };

    const onRemoveUser = async (userId: string) => {
        console.log("remove user", userId);
    };

    return (
        <div>
            <div className="m-3">
                <Input object={data} setObject={setData} title="Namn" fieldKey="name"/>
            </div>
            <Button onClick={onSave}>Uppdatera organisationen</Button>

            <div className="m-3">
                <strong>Ägare:</strong>
                {organization.users.map(user => (
                    <div key={user.id} className="flex">
                        {user.name}
                        <CircleX className="size-3 mx-1" onClick={() => onRemoveUser(user.id)}/>
                    </div>
                ))}
            </div>
            <Link href="/profile/organizations/???">
                <Button>Lägg till ny ägare</Button>
            </Link>
        </div>
    );
};

export default EditOrganization;