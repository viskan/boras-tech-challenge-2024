import { Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

const Organizations = async () => {
    const organizations = await api.organization.getMyOrganizations();
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-full p-4 mx-auto text-center">
                <strong>Your Organizations:</strong>
                {organizations.map(organization => (
                    <div key={organization.id} className="flex w-full justify-center pl-0.5 mx-auto text-center content-center	items-center self-center">
                        {organization.name}
                        <Link href={`/profile/organizations/${organization.id}`}>
                            <Edit className="size-3 mx-1 pl-0.5	content-center	 self-center"/>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="m-3  p-4 mx-auto text-center">
                <Link href="/profile/organizations/new">
                    <Button>Add new organization</Button>
                </Link>
            </div>
        </div>
    );
};

export default Organizations;