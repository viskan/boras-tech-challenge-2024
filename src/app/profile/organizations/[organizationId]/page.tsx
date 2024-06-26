import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import EditOrganization from "../../_components/EditOrganization";

type EditOrganizationPageProps = {
    params: {
        organizationId: string;
    };
};

/**
 * Page for editing organizations.
 */
const EditOrganizationPage = async ({params}: EditOrganizationPageProps) => {
    const organization = await api.organization.getById({organizationId: Number(params.organizationId)});
    const session = await getServerAuthSession();

    return (
        <div className="flex flex-col justify-center align-items">
            <div className="h-20 w-1/2 p-4 mx-auto text-center"/>
            <EditOrganization organization={organization} session={session!}/>
        </div>
    );
};

export default EditOrganizationPage;
