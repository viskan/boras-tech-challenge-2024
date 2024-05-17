"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../../../components/ui/button";

/**
 * Renders the sign-out button.
 */
const SignOut = () => {
    return (
        <div>
            <Button onClick={() => signOut()}>Logga ut</Button>
        </div>
    );
};

export default SignOut;
