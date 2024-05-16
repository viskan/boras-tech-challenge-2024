import {getServerAuthSession} from "~/server/auth";
import LoginArt from "./_components/LoginArt";
import SignIn from "./_components/SignIn";
import SignOut from "./_components/SignOut";

const LoginPage = async () => {
	const session = await getServerAuthSession();
	return (
		<div>
			<div className="h-40"/>
			{session !== null && <SignOut/>}
			{session === null && <SignIn/>}
			<LoginArt/>
		</div>
	);
};

export default LoginPage;
