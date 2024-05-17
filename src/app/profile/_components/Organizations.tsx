import { Edit } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";

const Organizations = async () => {
    const organizations = await api.organization.getMyOrganizations();
    return (
        <div>
            <div className="m-3">
                <strong>Organisationer:</strong>
                {organizations.map(organization => (
                    <div key={organization.id} className="flex">
                        {organization.name}
                        <Link href={`/profile/organizations/${organization.id}`}>
                            <Edit className="size-3 mx-1"/>
                        </Link>
                    </div>
                ))}
            </div>
            <Link href="/profile/organizations/new">
                <Button>Lägg till ny organisation</Button>
            </Link>
        </div>
    );
};

export default Organizations;