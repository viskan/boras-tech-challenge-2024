import { getServerAuthSession } from "~/server/auth";
import Profile from "./_components/Profile";
import SignIn from "./_components/SignIn";
import MaxWidthWrapper from "../_components/max-width-wrapper";
import Organizations from "./_components/Organizations";
import ProfileArt from "./_components/ProfileArt";

/**
 * The page for handling the profile. If the user is not logged in, the login form will be shown.
 */
const ProfilePage = async () => {
    const session = await getServerAuthSession();
    return (
        <MaxWidthWrapper tag="main">
            <div className="h-20"/>
            {session !== null && (
                <>
                    <Profile session={session}/>
                    <div className="h-4"/>
                    <Organizations/>
                    <div className="absolute right-0 bottom-28">
                        <ProfileArt/>
                    </div>
                </>
            )}
            {session === null && (
                <SignIn/>
            )}
        </MaxWidthWrapper>
    );
};

export default ProfilePage;
