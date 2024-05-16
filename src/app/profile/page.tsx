import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const getInitials = (name?: string) => {
  if (!name) {
    return "";
  }

  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

const LoginPage = async () => {
  const session = await getServerAuthSession();
 console.log(getOrganizations(), 'organizations');
  if (!session) {
    redirect("/login");

    return;
  }

  const initials = getInitials(session.user.name);
  const orgs = await getOrganizations();
  return (
    <main className="bg-background pt-10">
      <div className="flex flex-row justify-center items-center">
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
      <div className="flex flex-row justify-center items-center">
        Test, {orgs.}
      </div>
    </main>
  );
};

const getOrganizations = async () => {
  const organizations = await api.organization.getAll();
  console.log(organizations);
  return await organizations;
}

const createOrganization = async () => {
  const organization = await api.organization.create({
    name: "Test",
    description: "Test",
  });
  console.log(organization);
  return organization;
}

export default LoginPage;
