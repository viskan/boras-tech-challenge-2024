import { type getServerAuthSession } from "../../../server/auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import SignOut from "./SignOut";

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
    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <Avatar className="mr-2">
                    <AvatarFallback>{initials}</AvatarFallback>
                    {session.user.image && <AvatarImage src={session.user.image} alt={session.user.name ?? ""}/>}
                </Avatar>
                <div>
                    Hej, {session.user.name}
                </div>
            </div>
            <div className="h-4"/>
            <div className="flex flex-row items-center justify-center">
                <SignOut/>
            </div>
        </>
    );
};

export default Profile;
