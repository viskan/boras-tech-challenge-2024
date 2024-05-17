"use client";

import { type inferRouterOutputs } from "@trpc/server";
import { CircleX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Input from "~/app/_components/Input";
import { Button } from "~/components/ui/button";
import { type AppRouter } from "~/server/api/root";
import { type getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/react";

type Awaited<T> = T extends Promise<infer U> ? U : T;

type EditOrganizationProps = {
    organization: inferRouterOutputs<AppRouter>["organization"]["getById"];
    session: NonNullable<Awaited<ReturnType<typeof getServerAuthSession>>>;
}

const EditOrganization = ({organization, session}: EditOrganizationProps) => {
    const [data, setData] = useState({name: organization.name, users: organization.users});
    const saveOrganization = api.organization.saveOrganization.useMutation();
    const onSave = async () => {
        await saveOrganization.mutateAsync({
            organizationId: organization.id,
            ...data,
        });
    };

    const removeUser = api.organization.removeUser.useMutation();
    const onRemoveUser = async (userId: string) => {
        await removeUser.mutateAsync({organizationId: organization.id, userId});
        setData(previous => ({...previous, users: previous.users.filter(user => user.id !== userId)}));
    };

    return (
        <div>
            <div className="m-3">
                <Input object={data} setObject={setData} title="Name" fieldKey="name"/>
            </div>
            <Button onClick={onSave}>Update organization</Button>

            <div className="m-3">
                <strong>Owners:</strong>
                {data.users.map(user => (
                    <div key={user.id} className="flex">
                        {user.name}
                        {user.id === session.user.id && <span className="text-gray-500">&nbsp;(you)</span>}
                        {user.id !== session.user.id && <CircleX className="size-3 mx-1" onClick={() => onRemoveUser(user.id)}/>}
                    </div>
                ))}
            </div>
            <Button onClick={() => alert("Not implemented")}>Add new owner</Button>
        </div>
    );
};

export default EditOrganization;