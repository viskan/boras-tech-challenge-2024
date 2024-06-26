"use client";

import React from "react";
import {AlignJustify, MapPin, User, ClipboardList} from "lucide-react";
import MenuItem from "./menu-item";

/**
 * The menu bar that can be used to navigate pages.
 */
const MenuBar = () => {
    return (
        <div className="flex w-80 h-16 bg-accent border-2 border-primary rounded-full items-center justify-center">
            <MenuItem path="/" icon={MapPin} ariaLabel="Map"/>
            <MenuItem path="/events" icon={AlignJustify} ariaLabel="List"/>
            <MenuItem path="/profile" icon={User} ariaLabel="Profile"/>
            <MenuItem path="/leaderboard" icon={ClipboardList} ariaLabel="Leaderboard"/>
        </div>
    );
};

export default MenuBar;