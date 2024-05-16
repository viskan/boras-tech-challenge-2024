"use client";

import {getProviders, signIn} from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function SignIn() {
    getProviders().then(providers => console.log(providers));
    return (
        <div >
            <div>
                <Button onClick={() => signIn("google")}>Sign in with Google</Button>
            </div>
            <div>
                <Button onClick={() => signIn("facebook")}>Sign in with Facebook</Button>
            </div>
        </div>
    );
}
