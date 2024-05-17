"use client";

import {signIn} from "next-auth/react";
import {Button} from "../../../components/ui/button";
import LoginArt from "./LoginArt";

/**
 * Renders the various buttons to login via different providers.
 */
export default function SignIn() {
    return (
        <div className="flex justify-center items-center">
            <div>
                <Button onClick={() => signIn("google")}>Sign in with Google</Button>
            </div>
            <div>
                <Button onClick={() => signIn("facebook")}>Sign in with Facebook</Button>
            </div>
            <LoginArt/>
        </div>
    );
}
