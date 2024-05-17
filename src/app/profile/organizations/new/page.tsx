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
        router.refresh();
    };

    return (
        <div>
            <div className="h-20"/>
            <div className="m-3 w-1/2 p-4 mx-auto text-center">
                <Input object={data} setObject={setData} title="Name" fieldKey="name"/>
            </div>
            <div className="h-20 w-1/2 p-4 mx-auto text-center">
                <Button  onClick={onAddOrganization}>Add organization</Button>
            </div >
        </div>
    );
};

export default NewOrganizationPage;
