"use client";

import {signIn} from "next-auth/react";
import {Button} from "../../../components/ui/button";
import LoginArt from "./LoginArt";

/**
 * Renders the various buttons to login via different providers.
 */
export default function SignIn() {
    return (
        <div >
            <div className="flex justify-center items-center">
                <Button onClick={() => signIn("google")}>Sign in with Google</Button>
            </div>
            <div className="flex justify-center items-center">
                <Button onClick={() => signIn("facebook")}>Sign in with Facebook</Button>
            </div>
            <LoginArt/>
        </div>
    );
}
