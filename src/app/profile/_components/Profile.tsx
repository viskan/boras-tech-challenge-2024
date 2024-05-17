import { type getServerAuthSession } from "../../../server/auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/server";

type Awaited<T> = T extends Promise<infer U> ? U : T;

type ProfileProps = {
  session: NonNullable<Awaited<ReturnType<typeof getServerAuthSession>>>;
};

const getInitials = (name?: string) => {
  if (!name) {
    return "";
  }

  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

const Profile = async ({ session }: ProfileProps) => {
    const initials = getInitials(session.user.name);
    const myOrganizations = await api.organization.getMyOrganizations({userId: session.user.id})
    let allOrganizations: { id: number; name: string; }[] = []
    //if (myOrganizations === undefined || myOrganizations.length == 0)
    //{
    allOrganizations = await api.organization.getAll()
    //}
    console.log(allOrganizations, "orgs")
    return (
        <>
        <div className="flex flex-row items-center justify-center">
            <Avatar className="mr-2">
            <AvatarFallback>{initials}</AvatarFallback>
            {session.user.image && (
                <AvatarImage
                src={session.user.image}
                alt={session.user.name ?? ""}
                />
            )}
            </Avatar>
            Hej, {session.user.name}
        </div>
        <div className="flex flex-row items-center justify-center">
            <h1>Mina organisationer:</h1>
            <h1>Antal organisationer: &nbsp;  {allOrganizations.length} </h1>
            <ul>
                {myOrganizations.map((org) => (
                    <li key={org.id}>{org.name}</li>
                ))}
                <li>Mordor: 2 </li>
            </ul>
        </div>
        </>
    );
};

export default Profile;
