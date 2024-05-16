import { getServerAuthSession } from "~/server/auth";
import SignOut from "./_components/SignOut";
import Profile from "./_components/Profile";
import SignIn from "./_components/SignIn";

/**
 * The page for handling the profile. If the user is not logged in, the login form will be shown.
 */
const ProfilePage = async () => {
    const session = await getServerAuthSession();
    return (
        <main>
            {session !== null && (
                <>
                    <Profile session={session}/>
                    <div className="h-20"/>
                    <SignOut/>
                </>
            )}
            {session === null && (
                <SignIn/>
            )}
        </main>
    );
};

export default ProfilePage;
