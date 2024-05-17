"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "~/app/_components/Input";
import { Button } from "~/components/ui/button"
import { api } from "~/trpc/react";

/**
 * Page for adding new organizations.
 */
const NewOrganizationPage = () => {
    const [data, setData] = useState({name: ""});
    const addOrganization = api.organization.addOrganization.useMutation();
    const router = useRouter();

    const onAddOrganization = async () => {
        await addOrganization.mutateAsync(data);
        router.push("/profile");
    };

    return (
        <div>
            <div className="h-20"/>
            <div className="m-3">
                <Input object={data} setObject={setData} title="Namn" fieldKey="name"/>
            </div>
            <Button onClick={onAddOrganization}>Lägg till organisation</Button>
        </div>
    );
};

export default NewOrganizationPage;
