"use client";

import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

const SignOut = () => {
    return (
        <div>
            <Button onClick={() => signOut()}>Sign out</Button>
        </div>
    );
};

export default SignOut;
